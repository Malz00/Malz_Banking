'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './footer'
import { PlaidLink } from 'react-plaid-link'
import { User } from 'lucide-react'

const SideBar = ({user}:SiderbarProps) => {
  const pathname= usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href='/'
            className='mb-12 cursor-pointer  flex items-center gap-2'>
                <Image
                 src='/icons/logo.svg'
                  alt='Boboski logo'
                  width={34} 
                  height={34}
                  className='size-[20px] max-xl-size-[20px]'
                    />
                  <h1 className='sidebar-logo'>Boboski</h1>

            </Link>
            {sidebarLinks.map((item) => {
              const isActive = pathname === 
              item.route || 
              pathname.startsWith(`${item.route}/`);
              return (
                <Link href={item.route}
                  key={item.label}
                  className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
                >
                  <div className='relative size-6'>
                    <Image
                      src={item.imgURL }
                      alt={item.label}
                      fill
                      className={cn({
                        'brightness-[3] invert-0':
                        isActive,
                      })}
                    />
                  </div>
                  <p className={cn('sidebar-label',
                    {'text-white':isActive})}>
                       {item.label}
                       </p>
                </Link>
              );
            })}

            <PlaidLink user={user} />
        </nav>

        <Footer user={user} />
    </section>
  )
}

export default SideBar