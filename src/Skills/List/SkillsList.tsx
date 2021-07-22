import SkillItem from './SkillItem';
import { ListGroup, Spinner, Card, CardBody, Col } from 'reactstrap';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../Store/StoreProvider';
import BadgeList from '../../BadgeList';
const SkillsList = () => {
    const store = useStore();
    return <Col lg={7} className="h-100 p-3 p-lg-5 right-pane pb-3 pb-lg-0">
        <Card className='mb-4 skills-list'>
            <CardBody>
                <input className='form-control mb-3' placeholder='Search for skills...' value={store.searchQuery} onChange={e => {
                    store.setSearchQuery(e.target.value);
                }} />
                <div className='pb-2 font-weight-bold'>
                    Categories
                </div>
                <BadgeList
                    badges={store.allCategories.map(c => ({
                        key: c.key,
                        name: c.name,
                        colour: store.selectedCategories.includes(c.key) ? 'primary' : 'secondary'
                    }))}
                    onBadgeClick={key => store.clickCategoryAsync(key).catch(store.handleError)} />
            </CardBody>
        </Card>
        <Card style={{ background: 'white' }}>
            <CardBody>
                {
                    store.loading
                        ? <Spinner color='primary' />
                        : <ListGroup flush>
                            {store.skills?.items?.map(s => s.key && s.name ? <SkillItem
                                key={s.key}
                                skill={s}
                            /> : null)}
                            {(store.skills?.total ?? 0) === 0 && <span className='text-muted'>
                                No skills match your filter
                            </span>}
                        </ListGroup>
                }
            </CardBody>
        </Card>
    </Col>;
}
export default observer(SkillsList);