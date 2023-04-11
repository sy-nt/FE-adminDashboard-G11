'use client';
import { dataSampleApi } from '@/api-client';
import { E_sort, I_DataSample } from '@/models';
import {
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Input,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useSWR from 'swr';
const DataSample = () => {
    const router = useRouter();
    const [sort, setSort] = useState<E_sort>();
    const [search, setSearch] = useState('');
    const [valueToSearch, setValueToSearch] = useState('');
    const url = `/data-sample/data?search=${valueToSearch}&sort=${sort}`;
    const { data, mutate, error, isValidating } = useSWR(url);

    //handle function
    const handleInputSearch = (valueSearch: string) => {
        console.log(valueSearch);
        setSearch(valueSearch);
    };
    const handleChangeSort = (value: E_sort) => {
        setSort(value);
    };
    const handleButtonSearch = () => {
        setValueToSearch(search);
    };
    const handleMoveToDetail = (id: string) => {
        router.push(`dataSample/${id}`);
    };
    return (
        <Box paddingX={'30px'}>
            <Box marginBottom={'20px'}>
                <Heading>Data Sample</Heading>
            </Box>
            <Box
                display={'flex'}
                gap={'8px'}
                onClick={() => handleButtonSearch()}
            >
                <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<FiSearch />}
                />
                <Input
                    placeholder="Search"
                    w={'50%'}
                    value={search}
                    onChange={(e) => handleInputSearch(e.target.value)}
                />
                <Select
                    placeholder="Select option"
                    value={sort}
                    w={'20%'}
                    onChange={(e) => handleChangeSort(e.target.value as E_sort)}
                >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </Select>
            </Box>
            <TableContainer className="w-2/3">
                <Table size="lg" variant="simple" key={Math.random()}>
                    <Thead>
                        <Tr>
                            <Th className="">ID</Th>
                            <Th>Name data</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.data?.map(
                            (item: I_DataSample, index: number) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td
                                        onClick={() =>
                                            handleMoveToDetail(item.id)
                                        }
                                        cursor={'pointer'}
                                    >
                                        {item.name_data}
                                    </Td>
                                </Tr>
                            )
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DataSample;
