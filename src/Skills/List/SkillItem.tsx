import { Proficiency, Skill } from '../../api';
import { Collapse, ListGroupItem } from 'reactstrap';
import BadgeList from '../../BadgeList';
import { useStore } from '../../Store/StoreProvider';
import { useMemo, useState } from 'react';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ISkillProps {
    skill: Skill;
}

const SkillItem = ({ skill }: ISkillProps) => {
    const store = useStore();
    const [isOver, setIsOver] = useState(false);

    const proficiencyColour = useMemo(() => {
        switch (skill.proficiency) {
            case Proficiency.Learning:
                return 'warning';
            case Proficiency.Familiar:
                return 'primary';
            case Proficiency.Proficient:
                return 'success'
            default:
                throw new Error('Proficiency not supported');
        }
    }, [skill.proficiency]);

    const proficiencyIcon = useMemo(() => {
        switch (skill.proficiency) {
            case Proficiency.Learning:
                return faGraduationCap;
            case Proficiency.Familiar:
                return faCheck;
            case Proficiency.Proficient:
                return faThumbsUp
            default:
                throw new Error('Proficiency not supported');
        }
    }, [skill.proficiency]);
    return (
        <ListGroupItem
            className='px-0'
            tabIndex={0}
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
            onFocus={() => setIsOver(true)}
            onBlur={() => setIsOver(false)}
        >
            {
                <div>
                    <strong>
                        {skill.name}
                    </strong>
                    <span className={`ml-2 text-${proficiencyColour}`}>
                        <FontAwesomeIcon className='mr-2' icon={proficiencyIcon}/>
                        {skill.proficiency}
                    </span>
                    <div>
                        {skill.description}
                    </div>

                    {(skill.categories !== undefined)
                        ? <div className='mt-1'>
                            <BadgeList
                                badges={skill.categories.map(c => ({
                                    key: c.key,
                                    name: c.name,
                                    colour: store.selectedCategories.includes(c.key) ? 'primary' : 'light'
                                }))}
                                onBadgeClick={key => store.clickCategoryAsync(key).catch(store.handleError)}
                            />
                        </div>
                        : null}
                    <Collapse isOpen={isOver}>
                        {
                            skill.subSkills && skill.subSkills.length > 0 && <div className='mt-2'>
                                <strong style={{fontSize: '1rem'}}>Focus areas</strong>
                                <ul>
                                {
                                    skill.subSkills?.map(s => <li key={s.name}>
                                        <a href={s.url} target='_blank' rel='noreferrer'>{s.name}</a>
                                    </li>)
                                }
                                </ul>
                            </div>
                        }
                    </Collapse>
                </div>
            }
        </ListGroupItem>
    );
}

export default SkillItem;