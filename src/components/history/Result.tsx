import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type allCoin = {
    bpi: Record<string , number> | null;
    disclaimer: string;
    time: Record<string, string>;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Result = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [coindata, setCoinData] = useState<allCoin | null>(null);
    const [error, setError] = useState<boolean>(false);

    let query = useQuery();
    const start = query.get("start");
    const end = query.get("end");


    useEffect(() => {
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${start}&end=${end}`)
            .then(resp => {
                setCoinData(resp.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setError(true)
            })
    }, [])

    const render = () => {
        if (loading) {
            return (
                <p className='text-2xl'>Loading ...</p>
            )
        }
        else if (error) {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
                </div>
            )
        }
        else if (loading === false) {

            type data = {
                key: string;
                value: number;
            }

            const arrData: data[] = []

            if(coindata?.bpi){
                for (const [key, value] of Object.entries(coindata?.bpi)) {
                    arrData.push({key,value});
                  }
            }

            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-xl font-semibold'> ( From {start} To {end})</p>
                    <ul>
                        {
                            arrData.map(coin => <li className='text-xl'>{coin.key} - {coin.value.toLocaleString()} THB</li>)
                        }
                    </ul>
                </div>
            )
        }
    }

    return (
        <div>
            {render()}
        </div>
    )
}

export default Result;