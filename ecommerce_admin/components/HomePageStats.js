import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spineer from './Spinner';
import { subHours } from "date-fns";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from 'recharts';

export default function HomePageStarts() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/orders").then((result) => {
            setOrders(result.data);
            setIsLoading(false);
        })
    }, []);

    function calculateOrdersTotal(orders){
        let resultSum = 0;
        orders.forEach((order) => {
            const {line_items} = order;

            line_items.forEach((item) =>{
                const lineSum = (item.quantity * item.price_data.unit_amount) / 100;
                resultSum += lineSum;
            });
        });
        return new Intl.NumberFormat("pl-PL").format(resultSum);
    }

    function salesTotalNumber(sales){
        let resultSum = 0;
        sales.forEach((saleItem) => {
            const {line_items} = saleItem;
            line_items.forEach((item) => {
                const lineSum = (item.quantity * item.price_data.unit_amount) / 100;
                resultSum += lineSum;
            });
        });
        return new Intl.NumberFormat("pl-PL").format(resultSum);
    }

    if(isLoading)
    {
        return(
            <div className='my-4'>
                <Spineer fullWidth = {true}/>
            </div>
        )
    }

    const ordersToday = orders.filter(
        (order) => new Date(order.createdAt) > subHours(new Date(), 24)
    );

    const ordersPerWeek = orders.filter(
        (order) => new Date(order.createdAt) > subHours(new Date(), 7 * 24)
    );

    const ordersPerMonth = orders.filter(
        (order) => new Date(order.createdAt) > subHours(new Date(), 30 * 24)
    );

    const ordersPerYear = orders.filter(
        (order) => new Date(order.createdAt) > subHours(new Date(), 365 * 24)
    );

    // Function to generate the data for the histogram

    function generateHistogramData(labels, data){
        return labels.map((label, index) => ({
            name: label,
            orders: data[index],

        }));
    }

    return (
        <div className='px-4'>
            <h2>Total orders</h2>
            <div className='tiles-grid'>
                <div className='tile'>
                    <h2 className='tile-header'>Today</h2>
                    <div className='tile-number'>{ordersToday.length}</div>
                    <div className='tile-desc'>{ordersToday.length} orders for today</div>
                    <div className='tile-chart'>
                        <ResponsiveContainer width='100%' height={200}>
                            <BarChart data={generateHistogramData(["Today"], [ordersToday.length])}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                    
                </div>
                <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">{ordersPerWeek.length}</div>
          <div className="tile-desc">{ordersPerWeek.length} orders this week</div>
          <div className="tile-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateHistogramData(["This week"], [ordersPerWeek.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">{ordersPerMonth.length}</div>
          <div className="tile-desc">{ordersPerMonth.length} orders this month</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateHistogramData(["This month"], [ordersPerMonth.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This year</h3>
          <div className="tile-number">{ordersPerYear.length}</div>
          <div className="tile-desc">{ordersPerYear.length} orders this year</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateHistogramData(["This year"], [ordersPerYear.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h2>Total Sales</h2>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{calculateOrdersTotal(ordersToday)}</div>
          <div className="tile-desc">{ordersToday.length} orders today</div>
          <div className="tile-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateHistogramData(["Today"], [ordersToday.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">{calculateOrdersTotal(ordersPerWeek)}</div>
          <div className="tile-desc">{ordersPerWeek.length} sales this week</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateHistogramData(["This week"], [ordersPerWeek.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">{calculateOrdersTotal(ordersPerMonth)}</div>
          <div className="tile-desc">{ordersPerMonth.length} sales this month</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateHistogramData(["This month"], [ordersPerMonth.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This year</h3>
          <div className="tile-number">{calculateOrdersTotal(ordersPerYear)}</div>
          <div className="tile-desc">{ordersPerYear.length} sales this year</div>
          <div className="tile-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateHistogramData(["Today"], [orders.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>

    )
}
