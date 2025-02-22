import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
type LocalPlaidLinkOnSuccess = (public_token: string) => Promise<void>;
import { useRouter } from 'next/navigation';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant}: PlaidLinkProps) => {
    const router = useRouter();
    
    const [token, setToken] = useState('');

    useEffect(()=>{
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
        
            setToken(data?.LinkToken)
        }

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async ( public_token:string) => {
        await exchangePublicToken({
            publicToken:public_token,
            user,
        })

        router.push("/");
    }, [user])
  
    const config: PlaidLinkOptions = {
    token,
    onSuccess
  }
    const {open, ready} = usePlaidLink(config);

    return (
    <>
    {variant === 'primary' ? (
        <Button 
        onClick={() => open()}
        disabled={!ready}
        className='plaidlink-primary'>
            Connect Bank
        </Button>
    ): variant === 'ghost' ? (
        <Button onClick={() => open()} disabled={!ready}
          variant="ghost"  className='plaidLink-ghost'>
                     <Image
                src="/icons/connect-bank.svg"
                alt="Connect Bank"
                width={24}
                height={24}
            />
          <p className=' hidden text-[16px] font-semibold text-black-2 xl:block'> Connect Bank </p>  
        </Button>
    ):(
        <Button onClick={() => open()} disabled={!ready}
        className='plaidLink-default'>
            <Image
                src="/icons/connect-bank.svg"
                alt="Connect Bank"
                width={24}
                height={24}
            />
          <p className='text-[16px] font-semibold text-black-2'> Connect Bank </p>  
        </Button>
    )}
    
    </>
  )
}

export default PlaidLink