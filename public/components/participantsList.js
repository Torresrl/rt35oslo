class ParticipantsList extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log("loaded ParticipantsList")

        this.innerHTML = `
        <table id="participantsTable">
            <td>Club</td>
            <td>Country</td>
            <td>Name</td>
        </table>
        `

        let tabel = document.getElementById('participantsTable')

        const sheetId = '1giBZmrl7ZFHuBRlrMoAk0FJ6DxVboqpFKqzB0MgxpCg';
        const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        const sheetName = 'euroMeeting2023';
        const query = encodeURIComponent('Select *')
        const url = `${base}&sheet=${sheetName}&tq=${query}`

        // for testing: open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

        fetch(url)
            .then(res => res.text())
            .then(rep => {
                //Remove additional text and extract only JSON:
                const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                const dataSheet = jsonData['table']['rows']

                for (let i = 0; i < dataSheet.length; i++) {
                    let row = tabel.insertRow()

                    let clubCell = row.insertCell(0)
                    let contryCell = row.insertCell(1)
                    let nameCell = row.insertCell(2)
                    let hotelCell = row.insertCell(3)
                    let stayCell = row.insertCell(4)

                    clubCell.innerHTML = dataSheet[i]['c'][3]['f']
                    contryCell.innerHTML = dataSheet[i]['c'][4]['v']
                    nameCell.innerHTML = dataSheet[i]['c'][2]['v']
                    hotelCell.innerHTML = dataSheet[i]['c'][7] !== null ? dataSheet[i]['c'][7]['v'] : 'Not registered'
                    stayCell.innerHTML = dataSheet[i]['c'][5]['v']

                }
            })
    }
}

customElements.define('participants-list', ParticipantsList)
