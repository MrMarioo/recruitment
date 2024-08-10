import {
  Avatar,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const Widgets = styled('div')({
  width: '350px',
  padding: '20px',
});

export const SecondSideBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  if (isMobile) {
    return null;
  } else
    return (
      <Widgets>
        <TextField fullWidth placeholder="Szukaj" margin="normal" />
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">Warci obserwowania</Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>B</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Evelstar" secondary="@evelstar" />
                <Button variant="outlined" size="small">
                  Obserwuj
                </Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Widgets>
    );
};
