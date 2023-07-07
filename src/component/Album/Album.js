import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, Typography, Box, ThemeProvider, createTheme, } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CardActionArea } from '@mui/material';
import Fade from '@mui/material/Fade';
import Appbar from '../Header/Appbar';


const useStyles = makeStyles(() => ({
    actionArea: {
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    card: {
        minWidth: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 black
          .rotate(-12)
          .darken(0.2)
          .fade(0.5)}`,
        },
    }
}))


const url = "https://source.unsplash.com/random/800x800/?img=1"
// const defaultTheme = theme;
const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#202020',

            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // Provide every color token (light, main, dark, and contrastText) when using
        // custom colors for props in Material UI's components.
        // Then you will be able to use it like this: `<Button color="custom">`
        // (For TypeScript, you need to add module augmentation for the `custom` value)
        custom: {
            light: '#ffa726',
            main: '#f57c00',
            dark: '#ef6c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});
const extractTextFromJSON = function (jsonString) {
    // Parse the JSON string
    var jsonData = JSON.parse(jsonString);

    // Extract the "content" field from the JSON data
    var content = jsonData.content;

    // Initialize an empty string to store the extracted text
    var text = "";

    // Iterate over the content and extract the text
    content.forEach(function (item) {
        if (item.content) {
            var paragraphs = item.content;
            paragraphs.forEach(function (paragraph) {
                if (paragraph.content) {
                    text += paragraph.content[0].text;
                }
            });
        }
    });

    // Return the extracted text
    return text;
};

export default function Album() {

    const [cards, setCards] = useState([]);


    useEffect(() => {

        fetch('https://api.gyanibooks.com/library/get_dummy_notes')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCards(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const getRandomImageURL = () => {
        // Generate a random number between 1 and 1000 to use as a seed for the random image
        const randomSeed = Math.floor(Math.random() * 1000) + 1;

        // console.log("randomSeed->", randomSeed)
        // Use the randomSeed to construct a unique URL for the random image
        return `https://source.unsplash.com/random/400x200?sig=${randomSeed}`;
    };

    console.log(cards)
    return (
        <ThemeProvider theme={theme}>
            <Appbar/>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            The Indegenous
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Over 500 million of us on the planet and yet our voices, customs and languages are becoming extinct. We are either exotic or uncivilized to the "Western gaze". It's time to change that. It is time that our stories, traditions and values get a space in the global conversation.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Data Fetched</Button>
                            <Button variant="outlined" href='https://api.gyanibooks.com/library/get_dummy_notes/'>Data Got</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => {

                            // const textNote = extractTextFromJSON(card.notes);
                            const url = getRandomImageURL()
                            // const extractedText = extractTextFromJSON(card.notes);

                            return (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <CardActionArea className={useStyles.actionArea}>
                                        <Card className={useStyles.card}
                                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        >

                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    // 16:9
                                                    pt: '56.25%',
                                                }}

                                                image={url}
                                            >
                                                <CardActions>
                                                    {/* <Button size="small">ID-{card.id}</Button>
                                                    <Button size="small">USER-{card.user}</Button> */}
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        <Typography gutterBottom variant="h8" component="h5" style={{ color: 'white' }}>
                                                            ID-{card.id}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h8" component="h5" style={{ color: 'white' }}>
                                                            USER-{card.user}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActions>
                                            </CardMedia>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {card.title.toUpperCase()}
                                                </Typography>
                                                <Typography gutterBottom variant="h8" component="h5">
                                                    {card.category}
                                                </Typography>
                                                <Typography>
                                                    {/* {extractedText} */}
                                                    {/* <ReactMarkdown>{card.notes}</ReactMarkdown> */}
                                                    <Tooltip TransitionComponent={Fade}
                                                        TransitionProps={{ timeout: 600 }} title={card.notes}>
                                                        <Button sx={{ m: 1 }}>
                                                            {card.notes !== '' ? "NOTES" : "---"}
                                                        </Button>
                                                    </Tooltip>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}

