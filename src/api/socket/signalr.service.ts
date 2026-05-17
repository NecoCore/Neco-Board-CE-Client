import { getBaseUrl } from '@/utils/getBaseUrl';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { API_WEBSOCKET } from '../routes.api';

export type HubKey = "projects" | "task" | "app";

class SignalRService {
  private connections: Map<HubKey, HubConnection> = new Map();

  public buildConnection(hubKey: HubKey, hubUrl: string) {
    if(this.connections.has(hubKey)) {
      return this.connections.get(hubKey)!;
    }

    const connection = new HubConnectionBuilder()
      .withUrl(`${getBaseUrl()}/${API_WEBSOCKET}/${hubUrl}`, {
        accessTokenFactory: () => localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.connections.set(hubKey, connection);
    return connection;
  }

  public async startConnection(hubKey: HubKey) {
    const connection = this.connections.get(hubKey);
    if(connection && connection.state === "Disconnected") {
      try {
        await connection.start();
        console.log(`SignalR: Connected to [${hubKey}]`);
      } catch (error) {
        console.error(`SignalR: Error connecting to [${hubKey}]`, error);
      }
    }
  }

  public async stopConnection(hubKey: HubKey) {
    const connection = this.connections.get(hubKey);
    if(connection) {
      await connection.stop();
      this.connections.delete(hubKey);
      console.log(`SignalR: Disconnected from [${hubKey}]`);
    }
  }

  public getConnection(hubKey: HubKey) {
    return this.connections.get(hubKey);
  }
}

export const signalRService = new SignalRService();