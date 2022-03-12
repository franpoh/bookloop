const users = [
    { field: 'id', headerName: 'User ID' },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
        field: 'points',
        headerName: 'Points',
        type: 'number'
    },
    { field: 'type', headerName: 'Type' },
    { field: 'createdAt', headerName: 'Joined' },
];

export { users };