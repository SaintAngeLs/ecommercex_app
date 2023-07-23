import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spineer from './Spinner';
import { subHours } from "date-fns";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip,Bar } from 'recharts';
import { Typography, Card, CardContent, Grid,  CardHeader, IconButton, CircularProgress } from '@material-ui/core';
import { Money } from '@material-ui/icons';

export default function HomePageStats() {
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

    function calculateSalesTotalNumber(sales){
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
        (order) => new Date(order.createdAt) < subHours(new Date(), 24)
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
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <Typography variant="h4">Total orders</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      Today
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {ordersToday.length}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersToday.length} orders for today
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["Today"], [ordersToday.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      This week
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {ordersPerWeek.length}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersPerWeek.length} orders for this week
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["This week"], [ordersPerWeek.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      This Month
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {ordersPerMonth.length}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersPerMonth.length} orders this month
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["This Month"], [ordersPerMonth.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      This Year
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {ordersPerYear.length}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersPerYear.length} orders this year
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["This Year"], [ordersPerYear.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>

      <Grid item xs={12}>
          <Typography variant="h4">Total sales</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      Today
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {calculateSalesTotalNumber(ordersToday)}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersToday.length} orders today
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["Today"], [ordersToday.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      This week
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {calculateSalesTotalNumber(ordersPerWeek)}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersPerWeek.length} orders this week
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["This week"], [ordersPerWeek.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>
      

      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      This Month
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {calculateSalesTotalNumber(ordersPerMonth)}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersPerMonth.length} orders this month
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["This Month"], [ordersPerMonth.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
          <Card>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                      This Year
                  </Typography>
                  <Typography variant="h5" component="h2">
                      {calculateSalesTotalNumber(ordersPerYear)}
                  </Typography>
                  <Typography variant="body2" component="p">
                      {ordersPerYear.length} orders this year
                  </Typography>
                  <ResponsiveContainer width='100%' height={200}>
                      <BarChart
                          data={generateHistogramData(["This Year"], [ordersPerYear.length])}
                      >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3f51b5" />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </Grid>
  </Grid>
    

    )
}
