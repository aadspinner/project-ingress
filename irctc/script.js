document.getElementById('trainForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const trainNumber = document.getElementById('trainNumber').value;
    const apiKey = '2a8954b37cmsh2ba9ba40a5e0849p1c3794jsne6bd996235c3';

    try {
        const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainNumber}&startDay=1`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'irctc1.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            }
        });
        const data = await response.json();
        console.log('Live Train Status Data:', data); // Log the raw data

        document.getElementById('results').innerHTML = `
            <h2>Live Train Status</h2>
            <p><strong>Current Station:</strong> ${data.currentStation || 'N/A'}</p>
            <p><strong>Position:</strong> ${data.position || 'N/A'}</p>
            <p><strong>Delay:</strong> ${data.delay || 'N/A'} minutes</p>
            <p><strong>Next Station:</strong> ${data.nextStation || 'N/A'}</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
});
