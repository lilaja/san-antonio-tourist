import React, { Component } from 'react';

import './route.scss';

type RoutePropsType = {
    locations: Object,
    google: Object,
    directionsService: Object,
    directionsDisplay: Object,
}

const Route = class extends Component {
    constructor(props: RoutePropsType) {
        super(props);

        this.state = {
            route: null,
        };
    }

    displayRoute() {
        const {
            locations,
            directionsService,
            directionsDisplay,
        } = this.props;

        const from = locations.get(0);
        const to = locations.get(-1);
        const stops = [];

        if (locations.size > 2) {
            locations.pop().shift().forEach((location) => {
                stops.push({
                    location: location.place.geometry.location,
                    stopover: true,
                });
            });
        }

        const {
            origin = from,
            destination = to,
            waypoints = stops,
            optimizeWaypoints = true,
            travelMode = 'WALKING',
        } = locations || {};

        directionsService.route({
            origin,
            destination,
            waypoints,
            optimizeWaypoints,
            travelMode,
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                this.setState({
                    route: response.routes.shift(),
                });

                console.log(this.state.route);
            } else {
                window.alert('Directions request failed');
            }
        });
    }

    render() {
        return (
            <div>
                <button onClick={() => this.displayRoute()} disabled={this.props.locations.size < 1}>
                    Display Route
                </button>
            </div>
        );
    }
};

export default Route;