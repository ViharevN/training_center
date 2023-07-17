import React from 'react'

export function Info() {
    return (
        <div className='flex flex-col w-[400px] sm:w-full'>
            <h1 className='text-center text-2xl'>Информация о продуктах</h1>
            <div className='py-5 mt-3 h-[22.5rem] flex  items-center justify-center sticky mx-2'>
                <div className="mb-[20px] flex flex-col flex-[2_2_0%] lg:flex-row items-center justify-evenly bg-white p-5 max-w-[40rem] md:max-w-[75rem]">
                    <div className="p-[10px] lg:w-[calc(100%/5)] w-[calc(100%/2)] text-center lg:text-left">
                        <img src="./images/cards/alfabank.png" className="w-52 hover:shadow-[10px_5px_15px_rgba(0,0,0,0.25)] ease-in-out duration-[400ms] rounded-md" alt="Кредитная карта" />
                        <div className="flex h-[32px]">
                            <div className="w-[45px] mt-[10px] border-[#00b4e3] border-[1px] rounded-[3px]">
                                <img className="w-[40px] h-[20px] p-[4px] m-auto" alt="платежная система" src="./images/cards/mir.png" />
                            </div>
                            <div className="w-[45px] mt-[10px] ml-[10px] border-[#00b4e3] border-[1px] rounded-[3px]">
                                <img className="w-[30px] h-[20px] p-[3px] m-auto" alt="платежная система" src="./images/cards/master.png" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pb-[30px] lg:w-[calc((100%/5)*3)] lg:text-left text-center w-full justify-between">
                        <p className="font-bold text-[#110033] text-[1.375rem] px-[5px] leading-5">
                            Альфа-Банк <span style={{ color: '#b3b9c17d', fontSize: '14px', verticalAlign: 'top' }}>▶</span> Год без %
                        </p>
                        <div className="flex flex-row lg:justify-between justify-around items-start pt-[20px] pl-[5px] text-[1rem] leading-[1.125rem]">
                            <div className="pr-[20px] calc(100%/3)">
                                <p>до 365 дней</p>
                                <p className="mt-[5px]">льготный период</p>
                            </div>
                            <div className="px-[10px] calc(100%/3)">
                                <p>до 500 000 ₽</p>
                                <p className="mt-[5px]">кредитный лимит</p>
                            </div>
                            <div className="px-2 calc(100%/3) lg:pr-[3.4375rem]">
                                <p>Бесплатное обслуживание</p>
                                <p className="mt-[5px]">навсегда</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[22.5rem] flex  items-center justify-center sticky mx-2'>
                <div className="mb-[20px] flex flex-col flex-[2_2_0%] lg:flex-row items-center justify-evenly bg-white p-5 max-w-[40rem] md:max-w-[75rem]">
                    <div className="p-[10px] lg:w-[calc(100%/5)] w-[calc(100%/2)] text-center lg:text-left">
                        <img src="./images/cards/halva.png" className="w-52 hover:shadow-[10px_5px_15px_rgba(0,0,0,0.25)] ease-in-out duration-[400ms] rounded-md" alt="Кредитная карта" />
                        <div className="flex h-[32px]">
                            <div className="w-[45px] mt-[10px] border-[#00b4e3] border-[1px] rounded-[3px]">
                                <img className="w-[40px] h-[20px] p-[4px] m-auto" alt="платежная система" src="./images/cards/mir.png" />
                            </div>
                            <div className="w-[45px] mt-[10px] ml-[10px] border-[#00b4e3] border-[1px] rounded-[3px]">
                                <img className="w-[30px] h-[20px] p-[3px] m-auto" alt="платежная система" src="./images/cards/master.png" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pb-[30px] lg:w-[calc((100%/5)*3)] lg:text-left text-center w-full justify-between">
                        <p className="font-bold text-[#110033] text-[1.375rem] px-[5px] leading-5">
                            Совкомбанк <span style={{ color: '#b3b9c17d', fontSize: '14px', verticalAlign: 'top' }}>▶</span> Халва
                        </p>
                        <div className="flex flex-row lg:justify-between justify-around items-start pt-[20px] pl-[5px] text-[1rem] leading-[1.125rem]">
                            <div className="pr-[20px] calc(100%/3)">
                                <p>12 месяцев рассрочки</p>
                                <p className="mt-[5px]">льготный период</p>
                            </div>
                            <div className="px-[10px] calc(100%/3)">
                                <p>до 500 000 ₽</p>
                                <p className="mt-[5px]">кредитный лимит</p>
                            </div>
                            <div className="px-2 calc(100%/3) lg:pr-[3.4375rem]">
                                <p>0 ₽ — обслуживание</p>
                                <p className="mt-[5px]">и выпуск карты</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[22.5rem] flex items-center justify-center sticky mx-2'>
                <div className="mb-[20px] flex flex-col flex-[2_2_0%] lg:flex-row items-center justify-evenly bg-white p-5 max-w-[40rem] md:max-w-[75rem]">
                    <div className="p-[10px] lg:w-[calc(100%/5)] w-[calc(100%/2)] text-center lg:text-left">
                        <img src="./images/cards/tinkoff.png" className="w-52 hover:shadow-[10px_5px_15px_rgba(0,0,0,0.25)] ease-in-out duration-[400ms] rounded-md" alt="Кредитная карта" />
                        <div className="flex h-[32px]">
                            <div className="w-[45px] mt-[10px] border-[#00b4e3] border-[1px] rounded-[3px]">
                                <img className="w-[40px] h-[20px] p-[4px] m-auto" alt="платежная система" src="./images/cards/mir.png" />
                            </div>
                            <div className="w-[45px] mt-[10px] ml-[10px] border-[#00b4e3] border-[1px] rounded-[3px]">
                                <img className="w-[30px] h-[20px] p-[3px] m-auto" alt="платежная система" src="./images/cards/master.png" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pb-[30px] lg:w-[calc((100%/5)*3)] lg:text-left text-center w-full justify-between">
                        <p className="font-bold text-[#110033] text-[1.375rem] px-[5px] leading-5">
                            Тинькофф <span style={{ color: '#b3b9c17d', fontSize: '14px', verticalAlign: 'top' }}>▶</span> Платинум
                        </p>
                        <div className="flex flex-row lg:justify-between justify-around items-start pt-[20px] pl-[5px] text-[1rem] leading-[1.125rem]">
                            <div className="pr-[20px] calc(100%/3)">
                                <p>до 55 дней</p>
                                <p className="mt-[5px]">льготный период</p>
                            </div>
                            <div className="px-[10px] calc(100%/3)">
                                <p>до 700 000 ₽</p>
                                <p className="mt-[5px]">кредитный лимит</p>
                            </div>
                            <div className="px-2 calc(100%/3) lg:pr-[3.4375rem]">
                                <p>Бесплатное на всегда</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}