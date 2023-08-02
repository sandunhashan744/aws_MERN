const ROLEID = {
    SUBSCRIBER : 1,
    PROVIDER : 2,
    ADMIN : 3,
    SUPERUSER :4,
    MANAGER : 5,
    ASIS_PROVIDER : 22
}

const roles = [
    {
        roleId : ROLEID.SUBSCRIBER,
        roleName : "Subscriber",
        permission : ["CHANNEL_SUBS", "CHANNEL_UNSUB"]
    },
    {
        roleId : ROLEID.PROVIDER,
        roleName : "Provider",
        permission : ["CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_VIEW"]
    },
    {
        roleId : ROLEID.ADMIN,
        roleName : "Admin",
        permission : ["USER_DELETE", "USER_VIEW"]
    },
    {
        roleId : ROLEID.MANAGER,
        roleName : "Manager",
        permission : ["USER_VIEW"]
    },
    {
        roleId : ROLEID.ASIS_PROVIDER,
        roleName : "Asis_Provider",
        permission : ["CHANNEL_VIEW"]
    },
    {
        roleId : ROLEID.SUPERUSER,
        roleName : "SuperUser",
        permission : ["USER_DELETE"]
    },
    
]

export default roles