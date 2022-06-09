import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

export const Chart = () => {
    const [orderMonth, setOrderMonth] = useState(0)
    const [purchase, setPurchase] = useState(0)
    const [sales, setSales] = useState(0)

    let mydata
    let mydata1
    let mydata2
    useEffect(() => {
        fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: "Monthly_PS_sql",
        })
        .then( (response)=> response.json() )
        .then( (rdata)=>{
            let order = rdata.map(data => data['Order Month'])
            setOrderMonth(order)
            console.log("order : ",order)
            console.log('===================')
            console.log("order : ",order[0])

            let purc = rdata.map(data => data['Purchases'])
            setPurchase(purc)
            console.log("purc : ", purc)

            let sal = rdata.map(data => data['Sales'])
            setSales(sal)
            console.log("sal : ", sal)

            mydata = order[0]
            mydata1 = purc[0]
            mydata2 = sal[0]

            console.log("mydata : ", mydata )
            console.log("mydata1 : ", mydata1)
            console.log("mydata2 : ", mydata2)
            

            console.log("orderMonth : ", {orderMonth} )
            console.log("purchase : ", {purchase})
            console.log("sales : ", {sales})
            // setOrderMonth(orderMonth => [...orderMonth, data["Order Month"]]);
            // setPurchase(purchase => [...purchase, data["Purchases"]]);
            // setSales(sales => [...sales, data["Sales"]]);
        //  });
        })
          
    }, [])



    const colors = ['#5470C6', '#91CC75'];
    const [options, setOptions] = useState({
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['Purchase Count', 'Sales']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: mydata
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Purchase Count',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'Sales',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Purchase Count',
            type: 'bar',
            data: mydata1
          },
          {
            name: 'Sales',
            type: 'line',
            yAxisIndex: 1,
            data: mydata2
          }
        ]
        });	


	return (
        <div>
    <ECharts
			option={options}
      opts={{ renderer: 'purchase_Sales_Chart', width: 'auto', height: '100%' }}
    />
    <h1>{sales}</h1>
    </div>

  );
}