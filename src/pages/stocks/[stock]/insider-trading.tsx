import { Table, Space, Text, Container, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

import Layout from "../../../main/node/components/layout";
import { transactionColor, typeOfTransaction } from "../../../main/node/util/formating";

export default function InsiderTrading({ stockSymbol, insiderTrading }) {
  return (
    <Layout>
      <Container>
          <Title order={2} align="center" transform="capitalize">Insider Transactions for <Link href={`/stocks/${stockSymbol.symbol}`} passHref>{stockSymbol.symbol}</Link></Title>
            <Space h="md" />
                  <Table>
                    <thead>
                      <tr>
                        <th><Text transform="capitalize" size="lg" weight={700}>Insider</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Transaction</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Price Per Share</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Total Value</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Shares After</Text></th>
                      </tr>
                    </thead>
                    <tbody>
                      {insiderTrading.map(indTrade => 
                      <tr key={uuidv4()}>
                        <td>
                          <Stack spacing="xs">
                            <Text transform="capitalize" weight={700}>{indTrade["fullName"]}</Text>
                            <Text transform="capitalize" weight={500}>{indTrade["reportedTitle"]}</Text>
                          </Stack>
                        </td>
                        <td>
                          <Stack spacing="xs">
                            <Text transform="capitalize" color={transactionColor(indTrade["transactionCode"])} weight={700}>{typeOfTransaction(indTrade["transactionCode"])}</Text>
                            <Text transform="capitalize" weight={500}>{indTrade["transactionDate"]}</Text>
                          </Stack>
                        </td>
                        <td><Text align="right" transform="capitalize" weight={700}>${indTrade["transactionPrice"]}</Text></td>
                        <td><Text align="right" transform="capitalize" weight={700}>${indTrade["transactionValue"].toLocaleString()}</Text></td>
                        <td><Text align="right" transform="capitalize" weight={700}>{indTrade["postShares"].toLocaleString()}</Text></td>
                      </tr>
                      )}
                    </tbody>
                  </Table>
          </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  // set cache to not validate until the age is 24 hours - next day at time of update if after todays update, or 12-todays update time if before todays update, so will update max once a day
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )

  const stockInfo = "test"
  const stockSymbol = {"symbol": `${context.params.stock}`}
  const insiderTrading = [{"conversionOrExercisePrice":null,"directIndirect":"D","effectiveDate":"2022-05-01","filingDate":"2022-05-04","fullName":"LBLEE SJ AMA","is10b51":false,"postShares":35292,"reportedTitle":null,"secAccessionNumber":"30-2031-000260920030","symbol":"AAPL","transactionCode":"G","transactionDate":"2022-04-27","transactionPrice":null,"transactionShares":-1295,"transactionValue":null,"id":"NTCAOERSNNIS_RIIADST","key":"ALPA","subkey":"-33020030060009-0122","date":1651795200000,"updated":1723669009735},{"conversionOrExercisePrice":null,"directIndirect":"D","effectiveDate":"2022-04-29","filingDate":"2022-05-06","fullName":"aaeLtsim.rKed A hn","is10b51":true,"postShares":486084,"reportedTitle":",SP a nrVctdea rSeCyG","secAccessionNumber":"60900023011300-2002-","symbol":"AAPL","transactionCode":"S","transactionDate":"2022-05-01","transactionPrice":163.79,"transactionShares":-9387,"transactionValue":1527216,"id":"NSATCEDNRNIASOII_RTS","key":"LPAA","subkey":"002100930-01223-0600","date":1651622400000,"updated":1718823274912}]

  if (!stockInfo) {
    return {
      notFound: true
    }
  }

  return { props: { stockSymbol, insiderTrading } }
}