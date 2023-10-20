import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "donut", // Change the chart type to "donut"
  height: 220,
  series: [50, 20, 10, 22, 50, 10, 40], // Update series data for Donut chart
  options: {
    ...chartsConfig,
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500"], // Update colors array to match Donut chart
    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Customize the size of the donut
        },
      },
    },
    labels: ["M", "T", "W", "T", "F", "S", "S"], // Update labels for Donut chart
  },
};

// const websiteViewsChart = {
//   type: "line",
//   height: 220,
//   series: [
//     {
//       name: "Views",
//       data: [50, 20, 10, 22, 50, 10, 40],
//     },
//   ],
//   options: {
//     ...chartsConfig,
//     colors: "#fff",
//     plotOptions: {
//       bar: {
//         columnWidth: "16%",
//         borderRadius: 5,
//       },
//     },
//     xaxis: {
//       ...chartsConfig.xaxis,
//       categories: ["M", "T", "W", "T", "F", "S", "S"],
//     },
//   },
// };

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Website View",
    description: "Last Campaign Performance",
    footer: "campaign sent 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "pink",
    title: "Daily Sales",
    description: "15% increase in today sales",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "green",
    title: "Completed Tasks",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
