import React from 'react';
import { StyleSheet} from 'react-native';
import {getStore} from "./src/_store/store";
import Home from "./src/pages/home/Home";
import Details from "./src/pages/details/Details";
import {Router, Scene, Stack} from "react-native-router-flux";
import {Provider} from "react-redux";

const App = () => {

    return <Provider store={getStore()}>
        {/* replace with react navigator!!!*/}
        <Router>
            <Stack key="root" headerMode={'none'}>
                <Scene key="home"
                       component={Home}
                       headerMode={'none'}
                       initial={true}/>
                <Scene key="details"
                    component={Details}/>
            </Stack>
        </Router>
      </Provider>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
