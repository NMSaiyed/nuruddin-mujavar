/**
 * Charts.js - Skills Visualization
 * Initializes and configures Chart.js charts for the portfolio dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Register theme colors with Chart.js
    setupChartDefaults();
    
    // Skill data for radar chart
    const skillData = {
        frontend: 85, // Out of 100
        backend: 78,
        design: 65,
        databases: 80,
        devops: 70,
        mobile: 60
    };
    
    // Initialize radar chart for skills if element exists
    const radarChartElement = document.getElementById('skills-radar-chart');
    if (radarChartElement) {
        initSkillsRadarChart(radarChartElement, skillData);
    }
    
    // Setup observer to update chart theme when light/dark mode changes
    observeThemeChanges();
});

/**
 * Setup default Chart.js colors based on theme
 */
function setupChartDefaults() {
    const colors = getChartColors();
    
    // Set some defaults for all charts
    Chart.defaults.color = colors.textColor;
    Chart.defaults.borderColor = colors.borderColor;
    Chart.defaults.font.family = "'Inter', sans-serif";
}

/**
 * Initialize the skills radar chart
 * @param {HTMLCanvasElement} chartElement - The canvas element for the chart
 * @param {Object} skillData - Object containing skill categories and values
 */
function initSkillsRadarChart(chartElement, skillData) {
    // Get theme colors from CSS variables
    const colors = getChartColors();
    
    // Create radar chart
    const skillsChart = new Chart(chartElement, {
        type: 'radar',
        data: {
            labels: [
                'Frontend Development',
                'Backend Development',
                'UI/UX Design',
                'Databases',
                'DevOps',
                'Mobile Development'
            ],
            datasets: [{
                label: 'Skills',
                data: [
                    skillData.frontend,
                    skillData.backend,
                    skillData.design,
                    skillData.databases,
                    skillData.devops,
                    skillData.mobile
                ],
                backgroundColor: colors.backgroundColorAlpha,
                borderColor: colors.primaryColor,
                borderWidth: 2,
                pointBackgroundColor: colors.primaryColor,
                pointBorderColor: colors.backgroundColor,
                pointHoverBackgroundColor: colors.backgroundColor,
                pointHoverBorderColor: colors.primaryColor,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false,
                        stepSize: 20
                    },
                    grid: {
                        color: colors.borderColor
                    },
                    angleLines: {
                        color: colors.borderColor
                    },
                    pointLabels: {
                        color: colors.textColor,
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: colors.cardColor,
                    titleColor: colors.primaryColor,
                    bodyColor: colors.textColor,
                    borderColor: colors.borderColor,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Proficiency: ${context.raw}%`;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Store chart instance in global scope for later access
    window.skillsChart = skillsChart;
}

/**
 * Get chart colors based on current theme
 * @returns {Object} Object containing colors for charts
 */
function getChartColors() {
    const isDarkTheme = document.body.hasAttribute('data-theme') && 
                       document.body.getAttribute('data-theme') === 'dark';
    
    const computedStyle = getComputedStyle(document.documentElement);
    
    return {
        primaryColor: computedStyle.getPropertyValue('--primary-color').trim() || '#4f46e5',
        backgroundColor: computedStyle.getPropertyValue('--bg-color').trim() || '#f8fafc',
        cardColor: computedStyle.getPropertyValue('--bg-card').trim() || '#ffffff',
        textColor: computedStyle.getPropertyValue('--text-primary').trim() || '#0f172a',
        secondaryTextColor: computedStyle.getPropertyValue('--text-secondary').trim() || '#64748b',
        borderColor: computedStyle.getPropertyValue('--border-color').trim() || '#e2e8f0',
        // Add alpha to primary color for backgrounds
        backgroundColorAlpha: isDarkTheme ? 'rgba(162, 155, 254, 0.2)' : 'rgba(79, 70, 229, 0.2)'
    };
}

/**
 * Update charts when theme changes
 */
function updateCharts() {
    // Get new colors based on current theme
    const colors = getChartColors();
    
    // Update Chart.js defaults
    Chart.defaults.color = colors.textColor;
    Chart.defaults.borderColor = colors.borderColor;
    
    if (window.skillsChart) {
        // Update radar chart colors
        window.skillsChart.data.datasets[0].backgroundColor = colors.backgroundColorAlpha;
        window.skillsChart.data.datasets[0].borderColor = colors.primaryColor;
        window.skillsChart.data.datasets[0].pointBackgroundColor = colors.primaryColor;
        window.skillsChart.data.datasets[0].pointBorderColor = colors.backgroundColor;
        window.skillsChart.data.datasets[0].pointHoverBackgroundColor = colors.backgroundColor;
        window.skillsChart.data.datasets[0].pointHoverBorderColor = colors.primaryColor;
        
        // Update grid colors
        window.skillsChart.options.scales.r.grid.color = colors.borderColor;
        window.skillsChart.options.scales.r.angleLines.color = colors.borderColor;
        window.skillsChart.options.scales.r.pointLabels.color = colors.textColor;
        
        // Update tooltip colors
        window.skillsChart.options.plugins.tooltip.backgroundColor = colors.cardColor;
        window.skillsChart.options.plugins.tooltip.titleColor = colors.primaryColor;
        window.skillsChart.options.plugins.tooltip.bodyColor = colors.textColor;
        window.skillsChart.options.plugins.tooltip.borderColor = colors.borderColor;
        
        // Update the chart
        window.skillsChart.update();
    }
}

/**
 * Observe theme changes to update charts accordingly
 */
function observeThemeChanges() {
    // Watch for attribute changes on body element
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-theme') {
                // Update charts when theme changes
                updateCharts();
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, { attributes: true });
    
    // Watch for theme toggle click
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            // Small delay to ensure CSS variables are updated
            setTimeout(updateCharts, 50);
        });
    }
} 