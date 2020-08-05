
const main = () => {
    const baseUrl = `https://covid19.mathdro.id/api`
    const getGlobalCase = async () => {
        try {
            const response = await fetch(`${baseUrl}`)
            const responseJson = await response.json();
            if(responseJson.error) {
                showResponseMessage(responseJson.message);
             } else {
                renderGlobalcase(responseJson);
             }
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const getDaily = async () => {
        try {
            const response = await fetch(`${baseUrl}/daily`)
            const responseJson = await response.json();


            responseJson.sort((a,b) => {
                return a.reportDate - b.reportDate
            })

            if(responseJson.error) {
                showResponseMessage(responseJson.message);
             } else {
                renderDailyCase(responseJson);
             }
        } catch (error) {
            showResponseMessage(error);
        }
    }


    const renderDailyCase = async (Daily) => {
        const Data = await Daily

        const listDailyElement = document.querySelector("#listDaily");
        listDailyElement.innerHTML = "";
        const pick = ({ total }) => total;

        listDailyElement.innerHTML += `
        <div class="col-lg-12" style="margin-top:30px; text-align:center">
            <h3>Daily Update</h3>
        </div>
        `
        Data.reverse().forEach(({deaths, totalConfirmed, reportDate, deltaConfirmed}) => {
            listDailyElement.innerHTML += `
                <div class="col-lg-5 col-md-6 col-sm-12 mx-auto" style="padding:5px">
                    <div class="card bg-light">
                        <div class="card-body" style="text-align:center">
                        <h5>${reportDate}</h5>
                        <hr>
                        <p class="font-weight-bold">Confirmed: <span class="text-warning">${deltaConfirmed}</span></p>

                        <h4>Total</h4>
                        <p class="font-weight-bold" style="padding:0; margin:2px">Confirmed: <span class="text-warning">${totalConfirmed}</span></p>
                        <p class="font-weight-bold" style="padding:0; margin:2px">Confirmed: <span class="text-danger">${pick(deaths)}</span></p>
                        </div>
                    </div>
                </div>`
        });

    }

    const renderGlobalcase = async (global) => {
        const { confirmed, recovered, deaths } = await global;
        console.log(confirmed);
        const pick = ({ value }) => value;

        const listGlobalElement = document.querySelector("#listGlobal");
        listGlobalElement.innerHTML = "";

        listGlobalElement.innerHTML += `
        <div class="col-lg-12" style="margin-top:30px; text-align:center">
            <h3>Global Covid Cases</h3>
        </div>
        <div class="container row mx-auto">
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card bg-light">
                    <div class="card-body mx-auto">
                        <h1 class="mx-auto text-warning">${pick(confirmed)}</h1>
                        <h5 style="text-align:center">Confrimed</h5>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card bg-light">
                    <div class="card-body mx-auto">
                        <h1 class="mx-auto text-success">${pick(recovered)}</h1>
                        <h5 style="text-align:center">Recovered</h5>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card bg-light">
                    <div class="card-body mx-auto">
                        <h1 class="mx-auto text-danger">${pick(deaths)}</h1>
                        <h5 style="text-align:center">Deaths</h5>
                    </div>
                </div>
            </div>
        </div>
            `;


    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        getGlobalCase();
        getDaily();
    });
}

export default main;
