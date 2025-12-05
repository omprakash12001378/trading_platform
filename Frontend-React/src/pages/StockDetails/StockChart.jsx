import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { convertToUnixTimestamp } from "./ConvertToChartData";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/Redux/Coin/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    lable: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6",
    key: "6 Month Time Series",
    lable: "6 Month",
    value: 180,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 year",
    value: 365,
  },
];

const StockChart = ({ coinId, height = 450, showControls = true }) => {
  const [activeType, setActiveType] = useState(timeSeries[0]);
  const { coin, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  const [options] = useState({
    chart: {
      id: "area-datetime",
      type: "area",
      height: height,
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    annotations: {},
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      labels: {
        style: {
          colors: "#9ca3af",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9ca3af",
        },
      },
    },
    colors: ["#10b981"],
    markers: {
      colors: ["#fff"],
      strokeColors: "#fff",
      strokeWidth: 1,
      size: 0,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      strokeDashArray: 4,
      show: true,
    },
  });

  useEffect(() => {
    if (coinId) {
      dispatch(
        fetchMarketChart({
          coinId,
          days: activeType.value,
          jwt: localStorage.getItem("jwt") || auth.jwt,
        })
      );
    }
  }, [coinId, activeType.value]);

  if (coin.marketChart.loading) {
    return (
      <div className="h-full w-full inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 min-h-[200px]">
        <div className="w-16 h-16 border-4 border-t-4 border-t-emerald-500 border-emerald-200/20 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div id="charts">
        {showControls && (
          <div className="toolbars space-x-2 mb-4">
            {timeSeries.map((item) => (
              <Button
                onClick={() => setActiveType(item)}
                key={item.lable}
                variant={activeType.lable !== item.lable ? "outline" : "default"}
                size="sm"
                className={
                  activeType.lable === item.lable
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "hover:bg-emerald-500/10"
                }
              >
                {item.lable}
              </Button>
            ))}
          </div>
        )}
        <div id="chart-timelines">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={height}
          />
        </div>
      </div>
    </div>
  );
};

export default StockChart;
