import React from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";

const NotificationsCard = () => {
    const lastPostRef = useRef(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    const token = window.sessionStorage.getItem("JWT");

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ["infinite-query"],
        async ({ pageParam = 1 }) => {
            const query = `http://testingkisaanstation-env.eba-uezt4kgq.ap-south-1.elasticbeanstalk.com/admin/userDetails?page=${pageParam}&size=3`;

            const { data } = await axios.get(query, {
                headers: {
                    Authorization: `Bearer ` + token,
                    Application: "application/json",
                },
            });

            return data.list;
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1;
            },
            initialData: { pages: [], pageParams: [1] },
        }
    );

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage(); // Load more posts when the last post comes into view
        }
    }, [entry, fetchNextPage]);

    const notifications = data?.pages.flatMap((page) => page);
    console.log(notifications);

    return (
        <div className='NotificationsCard flex flex-col rounded-md border border-slate-500 shadow-sm p-4 gap-2 mt-3 overflow-hidden max-h-[450px]'>
            <div className='flex justify-between w-full mb-3'>
                <div className='text-lg text-brown font-bold'>Notifications</div>
            </div>

            <ul className='scrollbar overflow-y-auto max-h-[400px]'>
                {notifications.map((curr, index) => {
                    if (index === notifications.length - 1) {
                        return (
                            <li
                                key={index}
                                ref={ref}
                                className='my-[50px]'>
                                {curr.username}
                            </li>
                        );
                    } else {
                        return (
                            <li
                                key={index}
                                className='my-[50px]'>
                                {curr.username}
                            </li>
                        );
                    }
                })}
            </ul>
            {isFetchingNextPage && (
                <div class='animate-pulse flex space-x-4 pr-3 my-2'>
                    <div className='h-[50px] w-[50px] rounded-full bg-slate-500/10'></div>
                    <div className='flex flex-col w-full gap-3'>
                        <div className='w-full h-[20px] bg-slate-500/10'></div>
                        <div className='w-full h-[20px] bg-slate-500/10'></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsCard;
