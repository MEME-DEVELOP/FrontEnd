import React from "react";
import {Card, CardBody, CardSubtitle, CardText, Button, CardTitle, CardGroup} from "reactstrap";
import "./Login.css";

class Login extends React.Component{
    

    render(){
        return(
        <div className="contenedor">
            <CardGroup>
                <Card className="tarjeta">
                    <CardBody>
                        <CardTitle>
                            ¿No tienes empresa?
                        </CardTitle>
                        <CardSubtitle >
                            Crea una
                        </CardSubtitle>
                        
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                </Card>

                <Card className="tarjeta">
                    <CardBody>
                        <CardTitle >
                            ¿Ya tienes tu empresa?
                        </CardTitle>
                    <CardSubtitle >
                        Ingresa aqui
                    </CardSubtitle>
                    <CardText>
                        
                    </CardText>
                    <Button>
                        Button
                    </Button>
                    </CardBody>
                </Card>
            </CardGroup>
        </div>
        );
    }




}

export default Login;