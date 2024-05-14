import { useGetStatisticRevenueQuery } from "@/redux/services/statistics/statistics.service"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { ChartOptions } from "chart.js"
import { Select, Spin } from "antd"
import { useState } from "react"
const { Option } = Select

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function formatNumber(value: number) {
    const suffixes = ["", "K", "M", "B", "T"]
    let suffixIndex = 0

    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
        value /= 1000
        suffixIndex++
    }

    const formattedValue = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)

    return formattedValue + suffixes[suffixIndex]
}

export const options: ChartOptions<"bar"> = {
    plugins: {
        legend: {
            position: "top",
            align: "start",
            labels: {
                boxWidth: 16
            }
        }
    },
    responsive: true,
    interaction: {
        mode: "index" as const,
        intersect: false
    },
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false
            }
        },
        y: {
            stacked: true,
            ticks: {
                callback: function (value: string | number) {
                    return typeof value === "number" ? formatNumber(value) : value
                }
            }
        }
    },
    maintainAspectRatio: false
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear + 1 }, (_, index) => index)

const Revenue = () => {
    const [year, setYear] = useState(currentYear)

    const { data, isLoading } = useGetStatisticRevenueQuery({ year })
    const statistics = data?.data.statistics

    const dataRevenue = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Revenue payment",
                data: statistics?.map((entry) => entry.revenue),
                backgroundColor: "#E7894E",
                borderRadius: 10,
                barThickness: 20
            },
            {
                label: "Electric payment",
                data: statistics?.map((entry) => entry.electric),
                backgroundColor: "#1D5868",
                borderRadius: 10,
                barThickness: 20
            },
            {
                label: "Water payment",
                data: statistics?.map((entry) => entry.water),
                backgroundColor: "#81AAB5",
                borderRadius: 10,
                barThickness: 20
            },
            {
                label: "Additional payment",
                data: statistics?.map((entry) => entry.additionalPrice),
                backgroundColor: "#d3d3d3",
                borderRadius: 10,
                barThickness: 20
            }
        ]
    }

    const handleYearChange = (year: any) => {
        setYear(year)
    }

    return (
        <div className="!h-44">
            <h1 className="font-medium">Revenue report</h1>
            <div className="rounded-md p-2 shadow-md">
                <div className="relative z-50 -mb-6 flex justify-end">
                    <Select defaultValue={currentYear} style={{ width: 100 }} onChange={handleYearChange}>
                        {years.map((year) => (
                            <Option key={year} value={year}>
                                {year}
                            </Option>
                        ))}
                    </Select>
                </div>
                <Spin spinning={isLoading}>
                    <Bar data={dataRevenue} options={options} />
                </Spin>
            </div>
        </div>
    )
}

export default Revenue
