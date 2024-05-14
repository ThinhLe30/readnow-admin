import { useGetStatisticRentalQuery } from "@/redux/services/statistics/statistics.service"
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
import { useState } from "react"
import { Line } from "react-chartjs-2"
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

const Rentals = () => {
    const [year, setYear] = useState(currentYear)
    const { data, isLoading } = useGetStatisticRentalQuery({ year })
    const statistics = data?.data.statistics

    const dataRental: ChartData<"line", any, string> = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Rental payment",
                data: statistics?.map((entry: any) => entry?.rentals),
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

    return (
        <div className="!h-40 w-full">
            <h1 className="font-medium">Rentals report</h1>
            <div className="rounded-md p-2 shadow-md">
                <div className="flex justify-end">
                    <Select defaultValue={currentYear} style={{ width: 100 }} onChange={handleYearChange}>
                        {years.map((year) => (
                            <Option key={year} value={year}>
                                {year}
                            </Option>
                        ))}
                    </Select>
                </div>
                <Spin spinning={isLoading}>
                    <Line className="!h-36 !w-full" data={dataRental} options={options} />
                </Spin>
            </div>
        </div>
    )
}

export default Rentals
