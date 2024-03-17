"use client"
import { getCardData } from "@/redux/slices/cardSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { Box, Button, Card, CardContent, Link, Typography } from "@mui/material";
import { useEffect } from "react";

const CardComponent = () => {
    const dispatch = useDispatch();

    // Select the 'cardDetails' data from the Redux store using useSelector
    const { cardDetails } = useSelector((state) => state.cards);

    // useEffect hook to dispatch 'getResources' action when the component mounts
    useEffect(() => {
        dispatch(getCardData());
    }, []);

    // Handler function for clicking the 'Find something to do' button
    const handleGetWorkClick = () => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(getCardData());
    };

    
  const renderButton = (
    <>
      <h1
        style={{
          fontFamily: 'Roboto, sans-serif',
          color: '#000000',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}>
        Bored?
      </h1>
      <Button variant="contained" color="primary" onClick={handleGetWorkClick}>
        Find something to do
      </Button>
    </>
  );

  // JSX for rendering the card with fetched data
  const renderCard = (
    <Card
      sx={{
        mt: 10,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        backgroundColor: '#F8C8DC',
        padding: '16px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
      <CardContent>
        <Typography
          variant="h5"
          sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
          {cardDetails.activity}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
          Type: {cardDetails.type}
        </Typography>

        {/* Link to external resource */}
        <Link
          href={cardDetails.link}
          target="_blank"
          rel="noopener"
          color="primary"
          sx={{ textDecoration: 'none' }}>
          How to do...
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Render the button */}
      {renderButton}

      <div style={{ marginTop: '30px' }}>
        {/* Render the card */}
        {renderCard}
      </div>
    </Box>
  );
}
export default CardComponent;