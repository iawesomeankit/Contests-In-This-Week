console.log("I am here");
async function getcf() {
    let url = "https://kontests.net/api/v1/codeforces";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function getcc() {
    let url = "https://kontests.net/api/v1/code_chef";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function getleetcode() {
    let url = "https://kontests.net/api/v1/leet_code";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
let headc = document.querySelector('.headc');
let ed = new Date(new Date().setDate(new Date().getDate() +6));
ed.setHours(12,0,0);
headc.innerHTML =`<center>( ${new Date().toLocaleString()} to ${ed.toLocaleString()} )</center>`;
async function renderUsers() {
    let allContest =[];
    let users = await getcf();
    let users1 = await getcc();
    let users2 = await getleetcode();
    users.forEach(user => {
        allContest.push(user);
    });
    users1.forEach(user => {
        allContest.push(user);
    });
    users2.forEach(user => {
        allContest.push(user);
    });
    allContest.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.start_time) - new Date(b.start_time);
    });
    allContest = allContest.filter(contest=>{
        let dend = new Date(new Date().setDate(new Date().getDate() +6));
        dend.setHours(12,0,0);
        dend = dend.toISOString();
        console.log(dend);
        return contest.end_time<dend;
    })
    console.log(allContest);
      
    let html='';
    allContest.forEach(contest => {
        // let d = contest.start_time;
        let dur = contest.duration;
        let hr = Math.floor(dur/3600);
        let min = (dur-(hr*3600))/60;
        let abc =   `<div>
                        <h1>${contest.name}</h1>  
                        <h3><b>Start Time: </b>${`${new Date(contest.start_time).toLocaleString()}`}</h3>   
                        <h3><b>End Time: </b>${`${new Date(contest.end_time).toLocaleString()}`}</h3> 
                        <h3><b>Duration: </b>${hr}hours ${min}mins</h3>   
                        <h5 ><b>Link: </b><a href=${contest.url} target="_blank">${contest.url}</a></h5>
                        <hr>
                    </div>`
        html+=abc;
    });
    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();
