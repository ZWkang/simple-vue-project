export default {
    LOGIN_URL: 'https://cnodejs.org/api/v1/accesstoken',
    IS_COLLECTION_URL: 'https://cnodejs.org/api/v1/topic_collect/collect',
    SIMPLE_PROJECT_URL: 'https://github.com/ZWkang/simple-vue-project',
    IS_REPLY_URL: 'https://cnodejs.org/api/v1/reply/',
    CANCEL_COLLECTION_URL: 'https://cnodejs.org/api/v1/topic_collect/de_collect',
    GET_DETAIL_TOPIC_URL: 'https://cnodejs.org/api/v1/topic/',
    COLLECTION_TOPIC_URL: 'https://cnodejs.org/api/v1/topic_collect/',
    GET_TOPIC_LIST_URL: 'https://cnodejs.org/api/v1/topics',
    UPDATE_TOPIC_URL: 'https://cnodejs.org/api/v1/topics/update',
    POST_TOPIC_URL: 'https://cnodejs.org/api/v1/topics',
    REPLY_TOPIC_URL: topic_id =>{'https://cnodejs.org/api/v1/topics'+topic_id+'/replies'},
}