document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed'); // Log when DOM is loaded

    document.getElementById('trainForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        console.log('Form submitted'); // Log form submission

        const trainNumber = document.getElementById('trainNumber').value;
        const apiKey = 'your api key';

        console.log('Train Number:', trainNumber); // Log train number

        try {
            const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainNumber}&startDay=1`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'irctc1.p.rapidapi.com',
                    'x-rapidapi-key': apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Live Train Status Data:', data); // Log the raw data

            // Accessing the required properties from the response
            const currentStation = data.data.current_station_name || 'N/A';
            const position = data.data.status_as_of || 'N/A';
            const delay = data.data.delay || 'N/A';
            const nextStation = data.data.upcoming_stations && data.data.upcoming_stations.length > 0 ? data.data.upcoming_stations[0].station_name : 'N/A';

            document.getElementById('results').innerHTML = `
                <h2>Live Train Status</h2>
                <p><strong>Current Station:</strong> ${currentStation}</p>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Delay:</strong> ${delay} minutes</p>
                <p><strong>Next Station:</strong> ${nextStation}</p>
            `;
        } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = '<p>Error fetching data. Please try again later.</p>';
        }
    });
});
