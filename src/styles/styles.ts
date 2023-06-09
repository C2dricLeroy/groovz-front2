
import { CSSProperties } from 'react';

// @ts-ignore
const { width, height } = window;

export const styles: { [key: string]: CSSProperties } = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    error : {
        color: 'red',
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '4px',
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: '#fff',
    },
    icon: {
        paddingRight: 10,
    },
    passwordTextToggle : {
        color : "#A9A9A9",
    },
    mainTitle : {
        ...(width < 500 ? { fontSize: 80 } : { fontSize: 120 }),
        ...(height < 800 ? { marginTop: height * 0.025 } : { marginTop: height * 0.2 }),
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6E8898',
        textAlign: 'center',
    },
    button: {
        padding: '25px 30px',
        backgroundColor: '#050801',
        color: '#D3D0CB',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        letterSpacing: '4px',
        overflow: 'hidden',
        margin: '10px',
        width: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonHovered: {
        backgroundColor: '#FB5012',
        color: '#232528',
        boxShadow: '0px 0px 5px rgba(251, 80, 18, 0.5)',
    },
    buttonText: {
        color: '#D3D0CB',
        fontSize: 18,
    },
    cardContainer: {
        backgroundColor: '#000000',
        borderStyle: 'solid',
        borderColor: '#9FB1BC',
        width: width * 0.2, // Utilisation de vw (viewport width) pour spécifier une largeur relative
        height: width * 0.2, // Utilisation de vw (viewport width) pour spécifier une hauteur relative
        borderRadius: '10px',
        margin: '50px 0', // Utilisation de '50px 0' pour spécifier une marge verticale
        minWidth: '300px',
        minHeight: '300px',
    },
    homeText: {
        fontSize: 20,
        color: '#6E8898',
        margin: 50,
        marginTop: 100,
        textAlign: 'center',
    },
    mainText: {
        ...(width < 500 ? { fontSize: 30 } : { fontSize: 40 }),
        color: '#9FB1BC',
        marginTop: 50,
        textAlign: 'center',
    },
    cardText: {
        textAlign: 'center',
        padding: 20,
        color: '#232528',
        width: 'auto',
        maxWidth: width * 0.2,
        fontSize: 24,
        minWidth: 300,
        marginBottom: 50
    },
    homeFooter: {
        height: height * 0.3,
        backgroundColor: 'black',
    },
    arrow: {
        display: 'flex',
        position: 'absolute',
        bottom: 50
    },
    arrowHovered: {
        boxShadow: '0px 0px 10px rgba(251, 80, 18, 0.5)',
    },
    arrowImage: {
        height: 50,
        width: 50
    }
};
