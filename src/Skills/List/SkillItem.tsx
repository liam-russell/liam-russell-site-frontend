import { Skill } from '../../api';
import { ListGroupItem } from 'reactstrap';
import BadgeList from '../../BadgeList';
import { useStore } from '../../Store/StoreProvider';

export interface ISkillProps {
    skill: Skill;
}
 
const SkillItem = ({ skill }: ISkillProps) => {
    const store = useStore();
    return (
        <ListGroupItem className='px-0'>
            {
                <div>
                    <strong>
                        {skill.name}
                    </strong>
                    <div>
                        {skill.description}
                    </div>

                    {(skill.categories !== undefined)
                        ? <div className='mt-1'>
                            <BadgeList
                                badges={skill.categories.map(c => ({
                                    key: c.key,
                                    name: c.name,
                                    colour: store.selectedCategories.includes(c.key) ? 'primary' : 'secondary'
                                }))}
                                onBadgeClick={key => store.clickCategoryAsync(key).catch(store.handleError)}
                            />
                        </div>
                        : null}

                </div>
            }
        </ListGroupItem>
    );
}

export default SkillItem;