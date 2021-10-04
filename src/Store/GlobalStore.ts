import { makeObservable, observable, reaction, runInAction } from "mobx";
import { Client, SkillCategory, SkillPaged } from "../api";

export default class GlobalStore {
    private apiClient = new Client();
    constructor() {
        makeObservable(this, {
            initialising: observable,
            refreshing: observable,
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

    initialising = true;

    refreshing = true;

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
            this.initialising = false;
        })
    }

    handleError = (error: Error) => runInAction(() => {
        this.error = error;
    })
    
    refreshAsync = async () => {
        runInAction(() => {
            this.refreshing = true;
        });
        const skills = await this.apiClient.skills(
            this.selectedCategories,
            this.searchQuery,
            // The API has the potential to paginate results, this could be done via infinite scroll
            undefined,
            undefined
        )
        runInAction(() => {
            this.skills = skills;
        })
        runInAction(() => {
            this.refreshing = false;
        });
    }

    setSearchQuery = (value: string) => {
        runInAction(() => {
            this.searchQuery = value;
        })
    }

    clickCategoryAsync = async (key: string) => {
        runInAction(() => {
            this.refreshing = true;
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
    }
}