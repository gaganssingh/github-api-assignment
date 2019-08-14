"use strict";

function showResults(responseJson) {
    $("#results-list").html("");
    $("#js-user").val("");
    $("#js-github-handle").html("");
    $("#js-github-handle").addClass("hidden");
    $("section").addClass("hidden");
    $("#js-repo-heading").addClass("hidden");
    $("#js-error-message").addClass("hidden");
    let githubHandle = responseJson[0].owner.login;
    $("#js-github-handle").append(
        `<h2>Github Handle: ${githubHandle}</h2>
        <h2>No. of repos: ${responseJson.length}</h2>`);
    
        for (let i = 0; i < responseJson.length; i++) {
            $("#results-list").append(
                `<li><h3>Repo Name: <span class="unbold">${responseJson[i].name}</span></h3>
                <h3>Github repo link: <span class="unbold"><a href="${responseJson[i].html_url}" target="_blank">Click here</a></span></h3>
                <p>Repo Description: ${responseJson[i].description}</p></li>`);
        }
        $("#js-github-handle").removeClass("hidden");
        $("section").removeClass("hidden");
        $("#js-repo-heading").removeClass("hidden");
}

function searchRepos(name) {
    const url = `https://api.github.com/users/${name}/repos`;
    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => showResults(responseJson))
        .catch(err => {
            showError(err.message);
        });
}

function showError(err) {
    $("#js-error-message").removeClass("hidden");
}

function watchForm() {
    $("#js-form").submit(e => {
        event.preventDefault();
        let nameOfUser = $("#js-user").val();
        console.log(nameOfUser);
        searchRepos(nameOfUser);
    });
}

$(watchForm);