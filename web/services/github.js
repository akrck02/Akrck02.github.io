
export const github_user = (params) => {
    params = params || {};

    fetch('https://api.github.com/users/' + (params.username || 'akrck02'))
        .then(response => response.json())
        .then(user => {
            console.log(user);
        }
    );
};


export const github_user_repos = (params) => {
    params = params || {};

    fetch('https://api.github.com/users/' + (params.username || 'akrck02') + "/repos")
        .then(response => response.json())
        .then(user => {
            const url = user.languages;
            console.log(url);
        }
    );
};

