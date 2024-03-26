// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import {getUsersByPage} from '../../api/api'

const columns = [
  { id: 'userId', label: 'User Id', minWidth: 150 },
  { id: 'userName', label: 'User Name', minWidth: 150 },
  { id: 'email', label: 'email', minWidth: 150 },
  {
    id: 'firstName',
    label: 'First Name',
    minWidth: 150,
    align: 'right',
  },
  {
    id: 'lastName',
    label: 'Last Name',
    minWidth: 150,
    align: 'right',
  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 100,
    align: 'right',
  }
]


const rows = [
 
]

const UserTable = () => {
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const [userDataElements, setUserDataElements] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  //const [userDataPages, setUserDataPages] = useState([]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    getUsersByPage(page,rowsPerPage)
    .then((response) => {
        console.log(response)
        setUserDataElements(response.totalElements)
        setUserData(response.content)
        
        //setUserDataPages(response.totalPages)
    })
}, [page, rowsPerPage ]);

const columns = [
    { id: 'userId', label: 'User Id', minWidth: 150 },
    { id: 'userName', label: 'User Name', minWidth: 150 },
    { id: 'email', label: 'email', minWidth: 150 },
    {
        id: 'firstName',
        label: 'First Name',
        minWidth: 150,
        align: 'right',
    },
    {
        id: 'lastName',
        label: 'Last Name',
        minWidth: 150,
        align: 'right',
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 100,
        align: 'right',
    }
        ]

return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
            <TableRow>
                {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                </TableCell>
                ))}
            </TableRow>
                </TableHead>
        <TableBody>
        {userData.map(user => (
    <TableRow
      key={user.userId}
      hover
      role='checkbox'
      tabIndex={-1}
      onClick={() => setSelectedUser(user)}
    >
      <TableCell align='left'>{user.userId}</TableCell>
      <TableCell align='left'>{user.userName}</TableCell>
      <TableCell align='left'>{user.email}</TableCell>
      <TableCell align='right'>{user.firstName}</TableCell>
      <TableCell align='right'>{user.lastName}</TableCell>
      <TableCell align='right'>{user.phoneNumber}</TableCell>
    </TableRow>
  ))}
        </TableBody>
        </Table>
        </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5,10, 25, 100]}
            component='div'
            count={userDataElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
    </Paper>
    )
}

export default UserTable
