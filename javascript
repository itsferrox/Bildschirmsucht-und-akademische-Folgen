document.addEventListener("DOMContentLoaded", () => {
    // --- BEREICH 1: BILDSCHIRMZEIT-RECHNER ---
    
    // Elemente aus dem DOM holen
    const ageInput = document.getElementById("age");
    const screenTimeInput = document.getElementById("screenTime");
    
    const ageVal = document.getElementById("age-val");
    const timeVal = document.getElementById("time-val");
    
    const resJahre = document.getElementById("res-jahre");
    const resMonate = document.getElementById("res-monate");
    const resWochen = document.getElementById("res-wochen");
    const resTage = document.getElementById("res-tage");
    
    const compTitanic = document.getElementById("comp-titanic");
    const compSchule = document.getElementById("comp-schule");
    const compErde = document.getElementById("comp-erde");

    const LIFE_EXPECTANCY = 85;

    function calculate() {
        // Werte auslesen
        const age = parseInt(ageInput.value);
        const dailyHours = parseFloat(screenTimeInput.value);
        
        // UI Text updaten
        ageVal.textContent = age;
        timeVal.textContent = dailyHours;

        // Berechnungen anstellen
        const remainingYears = LIFE_EXPECTANCY - age;
        const totalFutureHours = remainingYears * 365.25 * dailyHours;

        // In andere Einheiten umrechnen
        const totalYears = totalFutureHours / (24 * 365.25);
        const totalMonths = totalFutureHours / (24 * 30.44);
        const totalWeeks = totalFutureHours / (24 * 7);
        const totalDays = totalFutureHours / 24;

        // Ergebnisse ins UI schreiben (auf 1 Nachkommastelle runden)
        resJahre.textContent = totalYears.toFixed(1);
        resMonate.textContent = Math.floor(totalMonths);
        resWochen.textContent = Math.floor(totalWeeks);
        resTage.textContent = Math.floor(totalDays);

        // Vergleiche berechnen
        // 1. Titanic schauen (Dauer ca. 3.25 Stunden)
        compTitanic.textContent = Math.floor(totalFutureHours / 3.25).toLocaleString('de-CH');
        
        // 2. Schultage absolvieren (Angenommen 6 Stunden pro Tag)
        compSchule.textContent = Math.floor(totalFutureHours / 6).toLocaleString('de-CH');
        
        // 3. Erde zu Fuß umrunden (Angenommen ca. 8000 Stunden Dauerlauf)
        compErde.textContent = (totalFutureHours / 8000).toFixed(1).toLocaleString('de-CH');
    }

    // Event Listener für die Slider hinzufügen
    ageInput.addEventListener("input", calculate);
    screenTimeInput.addEventListener("input", calculate);

    // Initiale Berechnung beim Laden der Seite
    calculate();


    // --- BEREICH 2: CHART.JS DIAGRAMME ---
    // Hier ist das Setup für das erste Diagramm (Hypothese 1).
    // Die Daten sind grob aus deinen Analysen abgeleitet.
    
    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['14-17 Jahre', '18-21 Jahre', '>30 Jahre'],
            datasets: [{
                label: 'Häufigste Bildschirmzeit (in Stunden)',
                data: [4, 3.5, 2.5], 
                backgroundColor: '#0071e3',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Stunden pro Tag'
                    }
                }
            }
        }
    });
});
