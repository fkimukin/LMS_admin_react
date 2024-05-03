import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { getUsersByPage, deleteUserApi } from '../../api/api';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar';

//import Popover from '@mui/material/Popover'


const UserTable = ({ setSelectedUser, setRefreshPage, refreshPage }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const [userDataElements, setUserDataElements] = useState([]);

//   const [refreshPage, setRefreshPage] = useState(0);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [snackbarMessage, setSnacbarMessage] = useState(null);
  const [snackbarAlert, setSnacbarAlert] = useState('info');

  // Popover field
  // const [anchorEl, setAnchorEl] = useState(null);
//   const handleOpenPopover = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClosePopover = () => {
//     setAnchorEl(null);
//     setPopoverMessage('')
//     setPopoverAlert('info')
//   };
// const open = Boolean(anchorEl);
// const id = open ? 'simple-popover' : undefined;

// <Snackbar fields
const [openSnackbar, setOpenSnackbar] = useState(false)

const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  })
const { vertical, horizontal, open } = state

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
}

// <Snackbar fields/>

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = () => {
    deleteUserApi(deleteUserId)
      .then(() => {
        setUserData(userData.filter(user => user.userId !== deleteUserId));
        setRefreshPage(refreshPage + 1);
        setDeleteUserId(null);
        setSnacbarMessage('User Successfully Deleted')
        setSnacbarAlert('success')              
      })
      .catch(error => {
        console.error("Error deleting user:", error);
        setSnacbarMessage('Delete User Failed : '+error)
        setSnacbarAlert('error')
      }); 
    setConfirmationOpen(false);
  };

  const handleOpenConfirmation = (userId) => {
    setDeleteUserId(userId);
    setConfirmationOpen(true);
  };

  useEffect(() => {
    getUsersByPage(page, rowsPerPage)
      .then((response) => {
        setUserDataElements(response.totalElements);
        setUserData(response.content);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, [page, rowsPerPage, refreshPage]);

  const columns = [
    { id: 'userId', label: 'User Id', minWidth: 150 },
    { id: 'userName', label: 'User Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'roles', label: 'Roles', minWidth: 150 },
    { id: 'firstName', label: 'First Name', minWidth: 150, align: 'right' },
    { id: 'lastName', label: 'Last Name', minWidth: 150, align: 'right' },
    { id: 'phone', label: 'Phone', minWidth: 100, align: 'left' },
    { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' }
  ];

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
                sx={{ cursor: 'pointer' }}
                hover
                role='checkbox'
                tabIndex={-1}
                onClick={() => setSelectedUser(user)}
              >
                <TableCell align='left'>{user.userId}</TableCell>
                <TableCell align='left'>{user.userName}</TableCell>
                <TableCell align='left'>{user.email}</TableCell>
                <TableCell align='left'>{user.roles.map((role, index) => (
                  <div key={index}>
                    {index > 0 ? <span> </span> : null}
                    <span>{role}</span>
                  </div>
                ))}</TableCell>
                <TableCell align='right'>{user.firstName}</TableCell>
                <TableCell align='right'>{user.lastName}</TableCell>
                <TableCell align='right'>{user.phoneNumber}</TableCell>
                <TableCell align='center'>
                  <Icon path={mdiTrashCan} size={1} color="red" onClick={() => {
                                            handleClickSnackbar();
                                            handleOpenConfirmation(user.userId);

                                            // Call your second method here
                                            
                                        }} />
                                        
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={userDataElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={deleteUser}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        key={'top' + 'center'}
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar} 
        onClose={handleCloseSnackbar} 
        autoHideDuration={6000}>
            <Alert severity={snackbarAlert}>{snackbarMessage}</Alert>
        </Snackbar>

    </Paper>

  );
};

export default UserTable;
