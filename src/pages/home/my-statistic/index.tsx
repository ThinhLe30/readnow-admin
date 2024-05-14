import MonthlyCost from "./monthly-cost"

const MyStatistic = () => {
    return (
        <div className="mb-8 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
            <h1 className="mb-2 text-2xl font-bold text-secondary">My Statistic</h1>
            <MonthlyCost />
        </div>
    )
}

export default MyStatistic
