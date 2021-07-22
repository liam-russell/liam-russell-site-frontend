import { Badge } from 'reactstrap';

export interface IBadgeListProps {
    badges: IBadgeItem[];
    onBadgeClick?: (badgeKey: string) => void;
    spacing?: string;
}

export interface IBadgeItem {
    key: string;
    name: string;
    colour: string;
}

const BadgeList = (props: IBadgeListProps) => {
    const spacing = props.spacing || '0.25rem';
    return (
        <div style={{ margin: `-${spacing}` }}>
            {props.badges.map(badge =>
                <Badge
                    onClick={() => props.onBadgeClick !== undefined ? props.onBadgeClick(badge.key) : null}
                    color={badge.colour}
                    key={badge.key}>
                    {badge.name}
                </Badge>
            )}
        </div>
    );
}
export default BadgeList;