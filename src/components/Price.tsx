import axios from "axios"
import { useEffect, useState } from "react"

const Price = () => {
    type bitcoin = {
        time: {
            updated: string;
        }
        bpi: {
            THB: {
                rate: string;
                code: string;
            }
        }
    }

    const [loading, setloading] = useState<boolean>(false)
    const [coin, setCoin] = useState<bitcoin | null>(null)
    
    useEffect(() => {
        setloading(true)
        axios.get<bitcoin>(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`)
            .then(resp => {
                setCoin(resp.data);
                setloading(false);
            })
            .catch(err => console.log(err));
    }, [])

    const price_page = () => {
        if (loading) {
            return (
                <p className='text-2xl'>Loading ...</p>
            )
        }
        else if (loading === false) {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Current price</p>
                    <p className='text-2xl'> {coin?.bpi.THB.rate} THB</p>
                    <p> (Last updated {coin?.time.updated}) </p>
                </div>
            )
        }
    }

    return (
        <div>
        {price_page()}
        </div>
    )
}

export default Price;