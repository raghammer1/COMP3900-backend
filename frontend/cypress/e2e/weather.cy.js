// describe('Weather API Testing', () => {
//   const lat = 40.7128;
//   const lon = -74.006;
//   const weatherResponse = {
//     location: {
//       name: 'New York',
//       region: 'New York',
//       country: 'United States',
//       lat: 40.7128,
//       lon: -74.006,
//       tz_id: 'America/New_York',
//       localtime: '2024-08-01 12:00',
//     },
//     current: {
//       temp_c: 25.0,
//       temp_f: 77.0,
//       condition: {
//         text: 'Clear',
//         icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
//         code: 1000,
//       },
//     },
//   };

//   beforeEach(() => {
//     cy.intercept('GET', 'http://api.weatherapi.com/v1/current.json', (req) => {
//       if (
//         req.query.key === 'ac9b9c9cdde741b99b310610242006' &&
//         req.query.q === `${lat},${lon}`
//       ) {
//         req.reply({ statusCode: 200, body: weatherResponse });
//       }
//     }).as('getWeatherData');
//   });

//   it('fetches weather data successfully', () => {
//     cy.visit('/weather-page'); // Adjust to your actual weather page

//     // Trigger the fetchWeather call if necessary
//     cy.get('[data-testid="fetch-weather-button"]').click(); // Adjust to your actual button or action

//     cy.wait('@getWeatherData');

//     // Validate the UI elements
//     cy.get('[data-testid="weather-location"]').should('contain', 'New York');
//     cy.get('[data-testid="weather-temp"]').should('contain', '25.0°C');
//     cy.get('[data-testid="weather-condition"]').should('contain', 'Clear');
//   });

//   it('handles API request failure', () => {
//     cy.intercept('GET', 'http://api.weatherapi.com/v1/current.json', {
//       statusCode: 500,
//       body: { error: 'Failed to fetch weather data' },
//     }).as('getWeatherDataFailure');

//     cy.visit('/weather-page'); // Adjust to your actual weather page

//     // Trigger the fetchWeather call if necessary
//     cy.get('[data-testid="fetch-weather-button"]').click(); // Adjust to your actual button or action

//     cy.wait('@getWeatherDataFailure');

//     // Validate error handling in the UI
//     cy.get('[data-testid="weather-error"]').should(
//       'contain',
//       'Failed to fetch weather data'
//     );
//   });
// });
