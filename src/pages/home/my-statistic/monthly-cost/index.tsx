import { useGetStatisticCostQuery } from "@/redux/services/statistics/statistics.service"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ChartDataset,
    ChartData
} from "chart.js"
import { ChartOptions } from "chart.js"
import { Select, Spin } from "antd"
import { useRef, useState } from "react"
import { Line, getElementAtEvent } from "react-chartjs-2"
import { TbReportMoney } from "react-icons/tb"
import { formatPrice } from "@/utils/helpers"
const { Option } = Select

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false
            }
        },
        y: {
            stacked: true
        }
    },
    maintainAspectRatio: false
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear + 1 }, (_, index) => index)

const currentMonth = new Date().getMonth() + 1

const months = Array.from({ length: 12 }, (_, index) => index + 1)

const MonthlyCost = () => {
    const chartRef = useRef<any>()
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const { data, isLoading } = useGetStatisticCostQuery({ year })
    const statistics = data?.data.statistics

    const dataRental: ChartData<"line", any, string> = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Rental payment",
                data: statistics?.map((entry: any) => entry?.cost),
                backgroundColor: "rgba(231,137,78,0.3)",
                borderColor: "#E7894E",
                borderWidth: 2,
                pointRadius: 4,
                fill: true,
                cubicInterpolationMode: "monotone"
            } as ChartDataset<"line", any>
        ]
    }

    const handleYearChange = (year: any) => {
        setYear(year)
    }

    const handleMonthChange = (month: any) => {
        setMonth(month)
    }

    const onClick = (event: any) => {
        const chart = getElementAtEvent(chartRef.current, event)

        if (chart && chart[0]) {
            console.log(chart[0].index + 1)

            setMonth(chart[0].index + 1)
        }
    }

    return (
        <div className="flex w-full gap-6">
            <div className="flex-1 ">
                <h1 className="font-medium">Monthly dashboard</h1>
                <div className="rounded-md p-2 shadow-md">
                    <div className="relative z-50 flex justify-end">
                        <Select defaultValue={year} style={{ width: 100 }} onChange={handleYearChange}>
                            {years.map((year) => (
                                <Option key={year} value={year}>
                                    {year}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Spin spinning={isLoading}>
                        <Line className="!h-52" ref={chartRef} data={dataRental} options={options} onClick={onClick} />
                    </Spin>
                </div>
            </div>
            <div className="w-80">
                <h1 className="font-medium">Detail</h1>
                <div className="rounded-md p-2 shadow-md">
                    <div className="relative z-50 flex justify-end">
                        <Select defaultValue={month} value={month} style={{ width: 100 }} onChange={handleMonthChange}>
                            {months.map((month) => (
                                <Option key={month} value={month}>
                                    {month}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Spin spinning={isLoading}>
                        <div className="flex h-52 flex-col gap-2">
                            <div className="rounded-md p-3 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TbReportMoney className="h-5 w-5 text-primary" />
                                        <span>Room payment</span>
                                    </div>
                                    <span className="font-bold text-red-500">
                                        -{statistics ? formatPrice(statistics[month - 1].cost) : "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-md p-3 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TbReportMoney className="h-5 w-5 text-primary" />
                                        <span>Electric payment</span>
                                    </div>
                                    <span className="font-bold text-red-500">
                                        -{statistics ? formatPrice(statistics[month - 1].electric) : "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-md p-3 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TbReportMoney className="h-5 w-5 text-primary" />
                                        <span>Water payment</span>
                                    </div>
                                    <span className="font-bold text-red-500">
                                        -{statistics ? formatPrice(statistics[month - 1].water) : "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-md p-3 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TbReportMoney className="h-5 w-5 text-primary" />
                                        <span>Additional payment</span>
                                    </div>
                                    <span className="font-bold text-red-500">
                                        -{statistics ? formatPrice(statistics[month - 1].additionalPrice) : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default MonthlyCost
