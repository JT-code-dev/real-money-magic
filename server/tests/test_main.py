"""
This module contains tests for the FastAPI application, including GraphQL queries 
and basic functionality.
"""

from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_hello_query():
    """
    Test the GraphQL hello query to ensure it returns the expected response.
    """
    response = client.post("/graphql", json={"query": "{ hello }"})
    assert response.status_code == 200
    assert response.json()["data"]["hello"] == "Hello from the backend! FastAPI + GraphQL!"

def test_dummy():
    """
    Test to ensure basic arithmetic works as expected.
    """
    assert 1 + 1 == 2

def test_rest_hello():
    """
    Test the REST /hello route (if still active).
    """
    response = client.get("/hello")
    assert response.status_code == 200
    assert "message" in response.json()

def test_math_still_works():
    assert 3 * 3 == 9

