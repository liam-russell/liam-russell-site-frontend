import { makeObservable, observable, reaction, runInAction } from "mobx";
import { Client, SkillCategory, SkillPaged } from "../api";

export default class GlobalStore {
    private apiClient = new Client();
    constructor() {
        makeObservable(this, {
            loading: observable,
            skills: observable,
            selectedCategories: observable,
            searchQuery: observable,
            allCategories: observable,
            error: observable
        });

        reaction(() => this.searchQuery, () => {
            this.refreshAsync().catch(this.handleError);
        }, {
            delay: 500
        });

        this.initialiseAsync().catch(this.handleError);
    }

    loading = true;

    skills?: SkillPaged;

    selectedCategories: string[] = [];

    searchQuery: string = '';
    
    allCategories: SkillCategory[] = [];

    error?: Error;

    private initialiseAsync = async () => {
        const categories = await this.apiClient.skillcategories();

        runInAction(() => {
            this.allCategories = categories;
        })

        await this.refreshAsync();
        runInAction(() => {
            this.loading = false;
        })
    }

    handleError = (error: Error) => runInAction(() => {
        this.error = error;
    })
    
    refreshAsync = async () => {
        const skills = await this.apiClient.skills(
            this.selectedCategories,
            this.searchQuery,
            undefined,
            undefined
        )
        runInAction(() => {
            this.skills = skills;
        })
    }

    setSearchQuery = (value: string) => {
        runInAction(() => {
            this.searchQuery = value;
        })
    }

    clickCategoryAsync = async (key: string) => {
        runInAction(() => {
            this.loading = true;
        });
        if (this.selectedCategories.includes(key)) {
            runInAction(() => {
                this.selectedCategories = this.selectedCategories.filter(c => c !== key);
            });
        } else {
            runInAction(() => {
                this.selectedCategories.push(key);
            });
        }
        await this.refreshAsync();
        runInAction(() => {
            this.loading = false;
        });
    }
}