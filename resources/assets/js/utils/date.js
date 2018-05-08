import moment from 'moment';

export const diffForHuman = (date) => {
    return moment(date).fromNow();
}
