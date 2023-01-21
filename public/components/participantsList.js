class ParticipantsList extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log("loaded ParticipantsList")

        this.innerHTML = `
        <table id="participantsTable">
            <td class="text-muted" ><b>Club</b></td>
            <td class="text-muted"><b>Country<b></td>
            <td class="text-muted"><b>Name<b></td>
            <td class="text-muted"><b>Hotel<b></td>
            <td class="text-muted"><b>Length of stay<b></td>
        </table>

        <h2>Statistics</h2>
        <p class="text-muted" >Some statistics based on the participants table.</p>

        <h3 class="text-center">Country</h3>
        <table id="countryTable">
            <td class="text-muted"><b>Country</b></td>
            <td class="text-muted"><b>People<b></td>
        </table>
        
        <h3 class="text-center">Length of stay</h3>
            <table id="lengthOfStayTable">
                <td class="text-muted" ><b>Periode</b></td>
                <td class="text-muted" ><b>People<b></td>
            </table>

        <h3 class="text-center">Hotel</h3>
            <table id="hotelTable">
                <td class="text-muted" ><b>Hotel</b></td>
                <td class="text-muted" ><b>People<b></td>
            </table>

            <h3 id="total"></h3>
        `

        const tabel = document.getElementById('participantsTable')

        const tabelCountry = document.getElementById('countryTable')
        const tabelStay = document.getElementById('lengthOfStayTable')
        const tabelHotel = document.getElementById('hotelTable')

        const sheetId = '1giBZmrl7ZFHuBRlrMoAk0FJ6DxVboqpFKqzB0MgxpCg';
        const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        const sheetName = 'euroMeeting2023';
        const query = encodeURIComponent('Select *')
        const url = `${base}&sheet=${sheetName}&tq=${query}`

        const countObject = (obj, key) => {
            if (obj[key]) {
                obj[key]++;
            } else {
                obj[key] = 1;
            }
        } 

        const createTable = (data, tabel) => {
            for (const key in data) {
                const row = tabel.insertRow()
                row.insertCell(0).innerHTML = key
                row.insertCell(1).innerHTML = data[key]
            }
        }

        // for testing: open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

        fetch(url)
            .then(res => res.text())
            .then(rep => {
                //Remove additional text and extract only JSON:
                const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                const dataSheet = jsonData['table']['rows']

                const totalRegistrted = dataSheet.length
                const countryData = {}
                const hotelData = {}
                const stayData = {}

                for (let i = 0; i < dataSheet.length; i++) {
                    const row = tabel.insertRow()

                    const clubCell = row.insertCell(0)
                    const contryCell = row.insertCell(1)
                    const nameCell = row.insertCell(2)
                    const hotelCell = row.insertCell(3)
                    const stayCell = row.insertCell(4)

                    const clubValue = dataSheet[i]['c'][3]['f']
                    const countryValue = dataSheet[i]['c'][4]['v']
                    const nameValue = dataSheet[i]['c'][2]['v']
                    const hotelValue = dataSheet[i]['c'][7] !== null ? dataSheet[i]['c'][7]['v'] : 'Not registered'
                    const stayValue = dataSheet[i]['c'][5]['v']

                    clubCell.innerHTML = clubValue
                    contryCell.innerHTML = countryValue
                    nameCell.innerHTML = nameValue
                    hotelCell.innerHTML = hotelValue
                    stayCell.innerHTML = stayValue

                    countObject(countryData, countryValue)
                    countObject(hotelData, hotelValue)
                    countObject(stayData, stayValue)

                }

                createTable(countryData, tabelCountry)
                createTable(hotelData, tabelHotel)
                createTable(stayData, tabelStay)

                document.getElementById("total").innerHTML = `Total participant: ${totalRegistrted}`;


            })
    }
}

customElements.define('participants-list', ParticipantsList)
