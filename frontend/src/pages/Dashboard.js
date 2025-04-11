import { useState } from "react";
import {
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Close as CloseIcon,
  AssignmentTurnedIn,
  PlayCircle,
  Assessment,
} from "@mui/icons-material";

const Dashboard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "Total test plan generated", value: "25", info: "10% up from last month", color: "#29b6f6", icon: <AssignmentTurnedIn fontSize="large" /> },
    { id: 2, title: "Total tests run", value: "2547", info: "2% up from last month", color: "#66bb6a", icon: <PlayCircle fontSize="large" /> },
    { id: 3, title: "Intelligence Analysis reports", value: "78", info: "2% down from last month", color: "#3F51B5", icon: <Assessment fontSize="large" /> },
  ]);

  const handleRemoveCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="page-content sidebar-page right-sidebar-page clearfix">
      <div className="page-content-wrapper">
        <div className="page-content-inner">
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Typography variant="h2">Dashboard</Typography>
            <Typography variant="h4">Welcome to Advance JMeter Testing World</Typography>
            <Grid container spacing={3} mt={2}>
              {cards.map((card) => (
                <Grid item xs={12} md={3} key={card.id}>
                  <Card sx={{ backgroundColor: card.color, color: "white", position: "relative" }}>
                    <CardContent>
                      <IconButton
                        onClick={() => handleRemoveCard(card.id)}
                        sx={{ position: "absolute", top: 5, right: 5, color: "white" }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Box display="flex" alignItems="center" gap={1}>
                        {card.icon}
                        <Typography variant="h6">{card.title}</Typography>
                      </Box>
                      <Typography variant="h4">{card.value}</Typography>
                      <Typography variant="body2">{card.info}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
