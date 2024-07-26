import React from 'react';
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import LOGO from '@assets/small-logo.svg?react';
import { useCryptoDataQuery } from '@/api/web-app';
import { Loader } from 'lucide-react';

const PriceList = () => {
    const { data: cryptoList, isLoading, isFetching } = useCryptoDataQuery();

    const columns = [
        {
            header: 'Rank',
            accessorKey: 'cmc_rank',
            meta: { align: 'left' },
        },
        {
            header: 'Name',
            accessorKey: 'name',
            meta: { align: 'left' },
        },
        {
            header: 'Symbol',
            accessorKey: 'symbol',
            meta: { align: 'left' },
        },
        {
            header: 'Market Cap',
            accessorKey: 'quote.USD.market_cap',
            cell: ({ getValue }) => <span>${getValue()}</span>,
            meta: { align: 'right' },
        },
        {
            header: 'Price',
            accessorKey: 'quote.USD.price',
            cell: ({ getValue }) => <span>${getValue()}</span>,
            meta: { align: 'right' },
        },
        {
            header: 'Circulating Supply',
            accessorKey: 'circulating_supply',
            cell: ({ row }) => (
                <div className="flex items-center justify-end space-x-2">
                    <span>{row.original.circulating_supply.toLocaleString()}</span>
                    <span className="text-gray-400">({row.original.symbol})</span>
                </div>
            ),
            meta: { align: 'right' },
        },
        {
            header: 'Volume (24h)',
            accessorKey: 'quote.USD.volume_24h',
            cell: ({ getValue }) => <span className="text-blue-500">${getValue().toLocaleString()}</span>,
            meta: { align: 'right' },
        },
        {
            header: '% 1h',
            accessorKey: 'quote.USD.percent_change_1h',
            cell: ({ getValue }) => {
                const value = getValue();
                return <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>{value.toFixed(2)}%</span>;
            },
            meta: { align: 'right' },
        },
        {
            header: '% 24h',
            accessorKey: 'quote.USD.percent_change_24h',
            cell: ({ getValue }) => {
                const value = getValue();
                return <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>{value.toFixed(2)}%</span>;
            },
            meta: { align: 'right' },
        },
        {
            header: '% 7d',
            accessorKey: 'quote.USD.percent_change_7d',
            cell: ({ getValue }) => {
                const value = getValue();
                return <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>{value.toFixed(2)}%</span>;
            },
            meta: { align: 'right' },
        },
        {
            header: 'Price Change Graph',
            accessorKey: 'price_change_graph',
            cell: ({ row }) => {
                const data = [
                    row.original.quote.USD.percent_change_1h,
                    row.original.quote.USD.percent_change_24h,
                    row.original.quote.USD.percent_change_7d,
                    row.original.quote.USD.percent_change_30d,
                    row.original.quote.USD.percent_change_60d,
                    row.original.quote.USD.percent_change_90d,
                ];

                return (
                    <Sparklines data={data} margin={5} height={50} width={100}>
                        <SparklinesLine className="text-gold" />
                    </Sparklines>
                );
            },
            meta: { align: 'right' },
        },
    ];

    // Initialize table data
    const table = useReactTable({
        data: cryptoList?.result, // Default to empty array if cryptoList is undefined
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (isLoading || isFetching) return <div>Loading...</div>;

    if (cryptoList?.result?.length === 0) {
        return <div className="text-center text-black">No data found.</div>;
    }

    return (
        <section className="relative bg-[#141923]">
            <div className="relative container flex flex-col justify-center items-center gap-4 h-full z-20 my-10">
                <h3 className="flex items-center gap-3 text-gold" data-aos="fade-up">
                    <LOGO className="animate-spin" />
                    Reo Max Coin
                </h3>
                <h1 className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1">
                    All Cryptocurrencies
                </h1>

                {isLoading || isFetching ? (
                    <div className="flex justify-center text-white">
                        <Loader size={30} className="animate-spin my-5" />
                    </div>
                ) : (
                    <>
                        <section className="w-full overflow-x-auto scrollbar-custom">
                            <table className="table-fixed min-w-full text-white">
                                <thead>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id} className="border-t border-b border-neutral-500">
                                            {headerGroup.headers.map(header => (
                                                <th
                                                    key={header.id}
                                                    className={`py-2 px-4 min-w-[100px] whitespace-nowrap ${header.column.columnDef.meta?.align === 'left' ? 'text-left' : 'text-right'} ${
                                                        header.index === 1 ? 'sticky left-0 bg-[#141923]' : ''
                                                    }`}
                                                >
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {table.getRowModel().rows.map(row => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <td
                                                    key={cell.id}
                                                    className={`py-2 px-4 min-w-[100px] whitespace-nowrap ${cell.column.columnDef.meta?.align === 'left' ? 'text-left' : 'text-right'} ${
                                                        cell.column.id === 'serial_no' ? 'sticky left-0 bg-[#141923]' : ''
                                                    }`}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    {table.getFooterGroups().map(footerGroup => (
                                        <tr key={footerGroup.id}>
                                            {footerGroup.headers.map(header => (
                                                <th
                                                    key={header.id}
                                                    className={`py-2 px-4 min-w-[100px] whitespace-nowrap ${header.column.columnDef.meta?.align === 'left' ? 'text-left' : 'text-right'}`}
                                                >
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </tfoot>
                            </table>
                        </section>
                        <div className="flex justify-center items-center my-4 gap-2 md:gap-5 text-white">
                            <button
                                className="min-w-[100px] px-2 md:px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </button>
                            <span className="flex gap-2">
                                Page<strong className="text-gold">{table.getState().pagination.pageIndex + 1}</strong>
                                <div> of </div>
                                <strong className="text-gold"> {table.getPageCount()}</strong>
                            </span>
                            <button className="min-w-[100px] px-2 md:px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default PriceList;
