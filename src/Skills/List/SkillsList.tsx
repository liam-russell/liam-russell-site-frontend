import SkillItem from './SkillItem';
import { ListGroup, Spinner, Card, CardBody, Col } from 'reactstrap';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../Store/StoreProvider';
import BadgeList from '../../BadgeList';
const SkillsList = () => {
    const store = useStore();
    return <Col lg={8} className="h-100 p-3 p-lg-5 right-pane pb-3 pb-lg-0">
        {!store.initialising && <div className='skills-list'>
            <h1 className='pb-3 font-weight- text-primary' style={{fontSize: '2rem', textTransform: 'uppercase'}}>
                <strong className='text-black'>Search</strong> my skills
            </h1>
            <Card className='mb-4 bg-white'>
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
                            colour: store.selectedCategories.includes(c.key) ? 'primary' : 'light'
                        }))}
                        onBadgeClick={key => store.clickCategoryAsync(key).catch(store.handleError)} />
                </CardBody>
            </Card>
        </div>}
        <Card style={{ background: 'white', overflow: 'hidden' }}>
            {!store.initialising && !store.refreshing && <div className='bg-primary text-white p-3 font-slab'>
                {store.skills?.total ? store.skills?.total : 'No'}
                {' matching '}
                {store.skills?.total === 1 ? 'skill' : 'skills'}
            </div>}
            {(store.refreshing || store.initialising || store.skills?.total !== undefined) && <CardBody>
                {
                    store.refreshing
                        ? <Spinner color='primary' />
                        : <ListGroup flush>
                            {store.skills?.items?.map(s => s.key && s.name ? <SkillItem
                                key={s.key}
                                skill={s}
                            /> : null)}
                        </ListGroup>
                }
            </CardBody>}
        </Card>
    </Col>;
}
export default observer(SkillsList);