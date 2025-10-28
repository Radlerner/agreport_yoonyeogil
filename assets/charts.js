// ==========================================================================
// 아원팜 종합 경영분석 리포트 - Charts JavaScript
// ==========================================================================

// Chart.js 기본 설정
Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#757575';

// ==========================================================================
// 데이터 정의
// ==========================================================================

// 월별 출하 데이터
const monthlyData = {
    labels: ['2월', '3월', '4월', '5월', '6월', '7월', '8월', '10월'],
    revenue: [277500, 19209500, 29318500, 34539400, 19560000, 1646000, 3662500, 517500],
    quantity: [16, 971, 2115.5, 3113.7, 1843.7, 60, 188, 41]
};

// 주간 단가 데이터
const weeklyPriceData = {
    labels: ['2월', '3월 1주', '3월 2주', '3월 3주', '3월 4주', '4월 1주', '4월 2주', '4월 3주', '4월 4주', '5월 1주', '5월 2주', '5월 3주', '5월 4주', '6월 1주', '6월 2주', '6월 3주', '6월 4주', '7월', '8월'],
    prices: [17250, 18056, 18781, 18816, 18132, 15286, 16033, 15297, 11240, 10924, 8864, 9385, 12413, 12383, 9125, 10000, 9405, 10821, 24857]
};

// 생육단계별 비용 데이터
const lifecycleCostData = {
    labels: ['정식기', '생육초기', '착과기', '수확기'],
    costs: {
        labor: [600000, 400000, 300000, 300000],
        pesticide: [0, 60000, 197000, 135000],
        fertilizer: [0, 0, 660000, 431600]
    }
};

// 리스크 데이터
const riskData = {
    labels: ['병해충', '환경', '수익성', '생산', '노동력'],
    scores: [4.0, 3.0, 2.5, 3.25, 2.0]
};

// 온도 데이터
const temperatureData = {
    labels: ['정식기', '생육초기', '착과기', '수확기'],
    min: [24.4, 20.7, 18.8, 17.8],
    max: [36.6, 29.5, 30.4, 28.2],
    optimal: [25, 25, 23, 25]
};

// 벤치마크 데이터
const benchmarkData = {
    labels: ['수익성', '비용효율', '생산성', '리스크관리', '경영안정성'],
    standard: [70, 70, 70, 70, 70],
    farm: [87.5, 89.5, 72.5, 67.5, 50.0]
};

// ==========================================================================
// 차트 생성 함수
// ==========================================================================

// 월별 출하 금액 및 수량 추이
function createMonthlyOutputChart() {
    const ctx = document.getElementById('monthlyOutputChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyData.labels,
            datasets: [
                {
                    label: '출하 금액 (원)',
                    data: monthlyData.revenue,
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 2,
                    yAxisID: 'y',
                    order: 2
                },
                {
                    label: '출하 수량 (box)',
                    data: monthlyData.quantity,
                    type: 'line',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1',
                    order: 1,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.dataset.yAxisID === 'y') {
                                    label += new Intl.NumberFormat('ko-KR').format(context.parsed.y) + '원';
                                } else {
                                    label += new Intl.NumberFormat('ko-KR').format(context.parsed.y) + ' box';
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '출하 금액 (원)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 10000).toFixed(0) + '만원';
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '출하 수량 (box)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// 주간 평균 단가 추이
function createPriceChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: weeklyPriceData.labels,
            datasets: [{
                label: '주간 평균 단가 (원/box)',
                data: weeklyPriceData.prices,
                borderColor: 'rgba(255, 152, 0, 1)',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgba(255, 152, 0, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '단가: ' + new Intl.NumberFormat('ko-KR').format(context.parsed.y) + '원';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: '단가 (원/box)'
                    },
                    ticks: {
                        callback: function(value) {
                            return new Intl.NumberFormat('ko-KR').format(value) + '원';
                        }
                    }
                }
            }
        }
    });
}

// 생육단계별 비용 구조
function createCostStructureChart() {
    const ctx = document.getElementById('costStructureChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lifecycleCostData.labels,
            datasets: [
                {
                    label: '인건비',
                    data: lifecycleCostData.costs.labor,
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 1
                },
                {
                    label: '농약비',
                    data: lifecycleCostData.costs.pesticide,
                    backgroundColor: 'rgba(244, 67, 54, 0.7)',
                    borderColor: 'rgba(244, 67, 54, 1)',
                    borderWidth: 1
                },
                {
                    label: '비료비',
                    data: lifecycleCostData.costs.fertilizer,
                    backgroundColor: 'rgba(33, 150, 243, 0.7)',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('ko-KR').format(context.parsed.y) + '원';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: '비용 (원)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 10000).toFixed(0) + '만원';
                        }
                    }
                }
            }
        }
    });
}

// 리스크 레이더 차트
function createRiskRadarChart() {
    const ctx = document.getElementById('riskRadarChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: riskData.labels,
            datasets: [{
                label: '리스크 점수',
                data: riskData.scores,
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderColor: 'rgba(255, 152, 0, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(255, 152, 0, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 152, 0, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// 온도 추이 차트
function createTemperatureChart() {
    const ctx = document.getElementById('temperatureChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: temperatureData.labels,
            datasets: [
                {
                    label: '최고 온도',
                    data: temperatureData.max,
                    borderColor: 'rgba(244, 67, 54, 1)',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 5
                },
                {
                    label: '최저 온도',
                    data: temperatureData.min,
                    borderColor: 'rgba(33, 150, 243, 1)',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 5
                },
                {
                    label: '최적 온도',
                    data: temperatureData.optimal,
                    borderColor: 'rgba(76, 175, 80, 1)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: '온도 (℃)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '℃';
                        }
                    }
                }
            }
        }
    });
}

// 벤치마크 비교 차트
function createBenchmarkChart() {
    const ctx = document.getElementById('benchmarkChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: benchmarkData.labels,
            datasets: [
                {
                    label: '업계 표준',
                    data: benchmarkData.standard,
                    backgroundColor: 'rgba(189, 189, 189, 0.2)',
                    borderColor: 'rgba(189, 189, 189, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(189, 189, 189, 1)',
                    pointRadius: 4
                },
                {
                    label: '아원팜',
                    data: benchmarkData.farm,
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(76, 175, 80, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value + '점';
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// ==========================================================================
// 초기화 함수
// ==========================================================================

function initializeCharts() {
    // 각 차트가 존재하는 경우에만 생성
    if (document.getElementById('monthlyOutputChart')) {
        createMonthlyOutputChart();
    }
    
    if (document.getElementById('priceChart')) {
        createPriceChart();
    }
    
    if (document.getElementById('costStructureChart')) {
        createCostStructureChart();
    }
    
    if (document.getElementById('riskRadarChart')) {
        createRiskRadarChart();
    }
    
    if (document.getElementById('temperatureChart')) {
        createTemperatureChart();
    }
    
    if (document.getElementById('benchmarkChart')) {
        createBenchmarkChart();
    }
}

// 페이지 로드 시 차트 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCharts);
} else {
    initializeCharts();
}