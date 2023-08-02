const PERM = {
    USER_VIEW : 'USER_VIEW',
    USER_DELETE : 'USER_DELETE',
    CHANNEL_CREATE : 'CHANNEL_CREATE',
    CHANNEL_DELETE : 'CHANNEL_DELETE',
    CHANNEL_VIEW : 'CHANNEL_VIEW',
    CHANNEL_SUBS : 'CHANNEL_SUBS',
    CHANNEL_UNSUB : 'CHANNEL_UNSUB',
    // TRADE_DELETE,
}

const permissions = [
    
    {
        pemCode: PERM.USER_DELETE,
        entity: 'user',
        action: 'delete',
    },
    {
        pemCode: PERM.CHANNEL_CREATE,
        entity: 'channel',
        action: 'create',
    },
    {
        pemCode: PERM.CHANNEL_DELETE,
        entity: 'channel',
        action: 'delete',
    },
    {
        pemCode: PERM.CHANNEL_VIEW,
        entity: 'channel',
        action: 'view',
    },
    {
        pemCode: PERM.CHANNEL_SUBS,
        entity: 'channel',
        action: 'subscribe',
    },
    {
        pemCode: PERM.CHANNEL_UNSUB,
        entity: 'channel',
        action: 'unsubscribe',
    },
]

export default permissions